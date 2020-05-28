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
        print(1)
        self.user = self.scope.get('user', None)
        if self.user.is_anonymous:
            print(2)
            await self.close()
        else:
            await self.accept()

    async def new_message(self, event):
        """
        Receive the message from the signal that tells us that a new chat
        message has been created, so we can send it back to the clients
        """
        # the 'event' will already contain the serialized message data
        await self.send_json(event)

    async def new_chat(self, event):
        """
        Receive the chat from the signal that tells us that a new chat
        has been created, so we can send it back to the clients
        """
        # the 'event' will already contain the serialized chat data
        await self.send_json(event)
