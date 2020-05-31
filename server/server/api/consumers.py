from django.db.models import TextChoices

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .exceptions import ClientError


class ChannelsGroups(TextChoices):
    NEW_MESSAGES = 'new_messages'


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """
    Consumer that will listen and notify whenever a new message is created.

    We are splitting all the type of messages so we can have more flexibility
    in the future
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
        # the 'event' will already contain the serialized message data
        await self.send_json(event)

    async def new_chat(self, event):
        """
        Receive the chat from the signal that tells us that a new chat
        has been created, so we can send it back to the clients
        """
        # the 'event' will already contain the serialized chat data
        await self.send_json(event)

    async def new_user_added(self, event):
        """
        Receive the list of users currently in the chat, alongside the chat id
        """        
        await self.send_json(event)
