from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets, status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from api.serializers import (
    UserSerializer, RegistrationSerializer, ChatSerializer, ChatCreateSerializer,
    ChatMessageSerializer, ChatDisplaySerializer, ChatMessageDisplaySerializer
)
from api.models import Chat, ChatMessage
from api.consumers import ChannelsGroups

class CustomAuthToken(ObtainAuthToken):
    """ We need to get the just logged-in user information, besides the token """

    permission_classes = [permissions.AllowAny] 

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.pk,
                'username': user.username,
                'email': user.email
            }
        })

class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    API endpoint that allows users to be viewed
    """
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    status_code = status.HTTP_400_BAD_REQUEST
    if serializer.is_valid():
        new_user = serializer.save()
        data['response'] = "Successfully registered a new user"
        data['user'] = {
            'id': new_user.pk,
            'username': new_user.username,
            'email': new_user.email
        }
        data['token'] = new_user.auth_token.key
        status_code = status.HTTP_201_CREATED
    else:
        data = serializer.errors
    return Response(data, status=status_code)


class ChatViewSet(viewsets.ModelViewSet):
    """ API endpoint to retrieve and create new chat instances """
    queryset = Chat.objects.prefetch_related('users', 'chat_messages').all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        """ 
        We'll use a different serializer depending on the incomming request action 
        
        For 'list' and 'retrieve' we'll use the ChatDisplaySerializer, for the rest of 
        actions we'll stick with the default serializer_class
        """
        if self.action in ['retrieve']:
            return ChatDisplaySerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ChatCreateSerializer
        return self.serializer_class

    def get_queryset(self):
        """ 
        Ensure we only retrieve the chats where the current 
        user has participation on
        """
        return self.request.user.user_chats.prefetch_related('users', 'chat_messages').all()

    def create(self, request, *args, **kwargs):
        """
        We are overriding this method to confirm that a chat_name was sent
        on the body of the request if the chat is not private
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        private = serializer.validated_data['private']
        chat_name = serializer.validated_data['chat_name']
        if not private and not chat_name:
            return Response(
                {'error': 'You need to specify a chat name'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Now, we also check if the users are the same
        anfitrion, guest = serializer.validated_data['users']
        if anfitrion == guest:
            return Response(
                {'error': 'You cannot start a chat with yourself'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Now, we check if, in case the chat is set to 'private', there is 
        # any chat already created between the two users
        if private:
            anfitrion_chats = set(anfitrion.user_chats.filter(private=True))
            guest_chats = set(guest.user_chats.filter(private=True))
            chats_in_common = anfitrion_chats.intersection(guest_chats)
            
            if len(chats_in_common) > 0:
                # This mean these two users already have a private conversation
                # There must be only one, but just in case, we get the first one
                redirect_to_chat = list(chats_in_common)[0]
                return Response(
                    {
                        'redirect_to': redirect_to_chat.id, 
                        'message': 'You laready have a private conversation with that user'
                    },
                    status=status.HTTP_302_FOUND
                )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        """
        We are overriding this method to check that no additional 
        user can be added to a privated chat
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Checks if a new user is trying to be added, but the chat is private
        event = serializer.validated_data.get('event', '')
        if instance.private and event == 'new_user_added':
            if len(serializer.validated_data['users']) > 2:
                return Response(
                    {'error': 'You cannot add new users to a private chat'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    def perform_create(self, serializer):
        """
        We're overriding this method to send a message via channels to the client.

        The reason we are doing it here and not in a signal as we did with messages
        is because the post_save signal is executed before the users are stored
        in the m2m table.

        After performing serializer.save() in this method, it will return the chat 
        instane with all the users already stored in the database.
        """
        chat_instane = serializer.save()
        # First we serialize the instane again
        s = ChatSerializer(chat_instane, context={'request': self.request})  # chat instance serialized
        chat_data = s.data
        chat_data['type'] = 'new.chat'
        chat_data['event'] = 'new_chat'

        # Then we send the message
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            ChannelsGroups.NEW_MESSAGES,
            chat_data
        )
    
    def perform_update(self, serializer):
        """
        Here we need to catch the event sent in the request, so we can handle and
        send the coorect message to the client
        """
        chat_instance = serializer.save()
        event = serializer.validated_data.get('event', '')        
        if event:
            chat_data = {}
            if event == 'new_user_added':
                # First we serialize the instane again
                s = ChatSerializer(chat_instance, context={'request': self.request})
                chat_data = s.data
                chat_data['event'] = event
                chat_data['type'] = event.replace('_', '.')
                chat_data['users'] = []
                for user in chat_instance.users.all():
                    u_serialized = UserSerializer(user)
                    chat_data['users'].append(u_serialized.data)

            # Then we send the message
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                ChannelsGroups.NEW_MESSAGES,
                chat_data
            )



class ChatMessageViewSet(viewsets.GenericViewSet, 
                         mixins.RetrieveModelMixin,
                         mixins.ListModelMixin,
                         mixins.CreateModelMixin):
    """
    API endpoint to create and retrieve chat messages
    """
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in  ['list', 'retrieve']:
            return ChatMessageDisplaySerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        """
        We are overriding this method to confirm that a chat message is not sent to a chat
        by a user that does not belong to that chat.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        chat = serializer.validated_data['chat']
        users_in_chat = chat.users.values_list('id', flat=True).all()
        if request.user.id not in users_in_chat:
            return Response(
                {'error': 'You do not belong to this chat'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """ 
        Ensures only messages that the current user has created
        """
        return ChatMessage.objects.filter(user=self.request.user)
