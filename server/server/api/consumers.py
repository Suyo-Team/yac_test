from django.db.models import TextChoices

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .exceptions import ClientError


class ChannelsGroups(TextChoices):
    NEW_MESSAGES = 'new_messages'


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """
    Consumer that will listen and notify whenever a new message is created
    """

    groups = [ChannelsGroups.NEW_MESSAGES]

    async def connect(self):
        """
        Called when a connection to web socket is established. If user is
        anonymous, we reject the connection, otherwise we accept it.
        """
        self.user = self.scope.get('user', None)
        if self.user.is_anonymous:
            await self.close()
        else:
            await self.accept()

    async def new_message(self, event):
        """
        Receive the message from the signal that tells us that a new chat
        message has been created, so we can send it back to the clients
        """
        user_id = event.get('user_id', None)
        if user_id:
            username = event.get('user_name', '')
            message = event.get('message')
            chat_id = event.get('chat_id')
            await self.send_json({
                'type': 'new_message',
                'user_id': user_id,
                'user_name': username,
                'message': message,
                'chat_id': chat_id
            })
