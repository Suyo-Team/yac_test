from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets, status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from api.serializers import (
    UserSerializer, RegistrationSerializer, ChatSerializer,
    ChatMessageSerializer, ChatDisplaySerializer, ChatMessageDisplaySerializer
)
from api.models import Chat, ChatMessage

class CustomAuthToken(ObtainAuthToken):
    """ We need to get the just logged-in user information, besides the token """

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
        data['email'] = new_user.email
        data['username'] = new_user.username
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
        if self.action in  ['list', 'retrieve']:
            return ChatDisplaySerializer

        return self.serializer_class

    def get_queryset(self):
        """ 
        Ensure we only retrieve the chats where the current 
        user has participation on 
        """
        return self.request.user.user_chats.all()

    def create(self, request, *args, **kwargs):
        """
        We are overriding this method to confirm that a chat_message was sent
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
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """ 
        Ensures only messages that the current user has created
        """
        return ChatMessage.objects.filter(user=self.request.user)