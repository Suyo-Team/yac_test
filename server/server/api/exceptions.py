
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