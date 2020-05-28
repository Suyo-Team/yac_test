
__all__ = [
    'ClientError', 'ChatNameNotSpecified',
    'InvalidChatRoom', 'MoreUsersThanAllowedInPrivateChat'
]


class Error(Exception):
    """ Base Exception for exceptions in this module"""
    pass


##### Consumers' related exceptions

class ClientError(Error):
    """
    Custom exception class that is caught by the websocket receive()
    handler and translated into a send back to the client.
    """
    def __init__(self, code):
        super().__init__(code)
        self.code = code


##### Models' Related Exceptions

class ChatNameNotSpecified(Error):
    """
    Error that raises when creating a non private chat room and the
    chat_name attribute is not specified
    """
    pass


class InvalidChatRoom(Error):
    """
    Error that raises when creating a new chat message and the chat room
    instance is not specified or it is not a it is not an instance of Chat class
    """
    pass

class MoreUsersThanAllowedInPrivateChat(Error):
    """
    Error that raises when we try to add a new user to a private chat, and
    there are already 2 users in the room
    """
    pass
