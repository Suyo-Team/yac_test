from django.conf import settings
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from .exceptions import *

class Chat(models.Model):
    """
    This model represents a chat session, it could be either private or public.

    In the first case, there are only two allowed user to join the chat.
    Otherwise, we're basically creating a group chat.

    Also, we must specify whether it is a temporal chat or not, in case it is,
    we must remove it from database/server (including all its attached
    files or images).
    """

    private = models.BooleanField(default=True)
    temporal = models.BooleanField(default=False)
    chat_name = models.CharField(max_length=100, blank=True, default='')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL)

    @classmethod
    def create_chat(cls, *args, **kwargs):
        """
        Creates a new chat room and ensures all the attributes are coherent, i.e.
        if it is a public chat (private=False) the chat_name must be specified
        """
        chat_name = kwargs.get('chat_name', '')
        private = kwargs.get('private', True)
        if not private and not chat_name:
            raise ChatNameNotSpecified

        return cls.objects.create(*args, **{
            'chat_name': chat_name,
            'private': private
        })

    def get_chat_name(self, for_user):
        """
        When the chat is private (only 2 users in the room, the chat_name will
        vary for each user, this is, each user will see the name of the other
        user he/she is chatting with, in that case, the chat_name field will be
        left blank. But in the case it is a non private chat (more that 2 users),
        a name for the chat must be specified

        Returns a tuple (chat_name, other_user), in case it is public, other_user
        will be None
        """
        if self.private:
            # look for other user's name
            other_user = self.users.get(~Q(id=for_user.id))
            return other_user.name, other_user

        return self.chat_name if self.chat_name else f'chat_{self.id}', None

    def join_user(self, user):
        """
        Add the user to the chat. In case it is a private chat, there must
        be only two users in the chat

        'user' must be a Users model instance
        """
        users_in_room = self.users.count()
        if self.private and users_in_room >= 2:
            raise MoreUsersThanAllowedInPrivateChat
        self.users.add(user)


class ChatMessage(models.Model):
    """
    Chat Message, It handles only text messages
    """
    created = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='messages'
    )
    text = models.TextField(max_length=300, blank=True, default='')

    @classmethod
    def create_message(cls, msg_type, chat):
        """
        Creates a new text message in a specific chat room
        """
        if not isinstance(chat, Chat):
            raise InvalidChatRoom
