from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from api.models import ChatMessage, Chat
from api.serializers import ChatDisplaySerializer, ChatMessageDisplaySerializer
from api.consumers import ChannelsGroups

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=ChatMessage)
def new_message(sender, instance, created, **kwargs):
    """
    Whenever a new message is created we'll broadcast a message
    about this event.
    """
    if created:
        serializer = ChatMessageDisplaySerializer(instance)
        message_data = serializer.data
        message_data['type'] = 'new.message'
        message_data['event'] = 'new_message'

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            ChannelsGroups.NEW_MESSAGES,
            message_data
        )


@receiver(post_save, sender=Chat)
def new_chat(sender, instance, created, **kwargs):
    """
    Whenever a new chat is created we'll broadcast a message
    about this event.
    """
    if created:
        serializer = ChatDisplaySerializer(instance)
        chat_data = serializer.data
        chat_data['type'] = 'new.chat'
        chat_data['event'] = 'new_chat'

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            ChannelsGroups.NEW_MESSAGES,
            chat_data
        )
