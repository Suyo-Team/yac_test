from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from api.models import ChatMessage, Chat
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
        message = instance.text

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            ChannelsGroups.NEW_MESSAGES,
            {
                'type': 'new.message',
                'chat_id': instance.chat_id,
                'event': 'new_message',
                'user_id': instance.user.id,
                'user_name': instance.user.username,
                'message': message
            }
        )
