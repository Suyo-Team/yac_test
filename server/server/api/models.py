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
    chat_name = models.CharField(max_length=100, blank=True, default='')
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_chats')

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
        related_name='user_messages'
    )
    text = models.TextField(max_length=300, blank=True, default='')

    @classmethod
    def create_message(cls, msg_type, chat):
        """
        Creates a new text message in a specific chat room
        """
        if not isinstance(chat, Chat):
            raise InvalidChatRoom

    def __str__(self):
        return f'{self.text} - from {self.user} at {self.created}'
