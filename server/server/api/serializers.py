from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers

from api.models import Chat, ChatMessage


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Simple User serializer to display User information 
    """
    class Meta:
        model = get_user_model()
        fields = ['id', 'url', 'username', 'email']


class RegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        new_user = get_user_model()(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match'})
        new_user.set_password(password)
        new_user.save()

        return new_user


class ChatMessageSerializer(serializers.ModelSerializer):
    """ 
    Serializer to be used to validate the data for creating 
    new messages 
    """
    class Meta:
        model = ChatMessage     
        fields = ['id', 'created', 'chat', 'text']


class ChatMessageDisplaySerializer(serializers.ModelSerializer):
    """ 
    Serializer used for displaying purposes, it includes a
    serialization of the user that created it 
    """
    user = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ['id', 'created', 'chat', 'user', 'text']


class ChatMessageNestedSerializer(serializers.ModelSerializer):
    """
    This serializer will be used only for displaying it or retrieving it 
    along with the chat serializer, therefore, we exclude the 'chat' field
    from the serializer
    """
    user = UserSerializer()

    class Meta:
        model = ChatMessage
        fields = ['id', 'created', 'user', 'text']


class ChatDisplaySerializer(serializers.ModelSerializer):
    """
    Serializer used to display and retrieve the chats information only 
    """
    chat_messages = ChatMessageNestedSerializer(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)
    chat_name = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ['id', 'chat_name', 'private', 'users', 'chat_messages']

    def get_chat_name(self, obj):
        """
        When the chat is private (only 2 users in the room, the chat_name will
        vary for each user, this is, each user will see the name of the other
        user he/she is chatting with, in that case, the chat_name field will be
        left blank. But in the case it is a non private chat (more that 2 users),
        a name for the chat must be specified
        """
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        chat_name = obj.chat_name
        if user:
            if obj.private:
                # look for other user's name
                other_user = obj.users.get(~Q(id=user.id))
                return other_user.username

        return chat_name if chat_name else f'chat_{obj.id}'


class ChatSerializer(serializers.ModelSerializer):
    """ Serializer used to create or edit a Chat instance """
    
    class Meta:
        model = Chat
        fields = ['id', 'chat_name', 'private', 'users']