"""
Custom TokenAuthentication Middlewarer for channels

taken from:
https://stackoverflow.com/questions/59632125/synchronousonlyoperation-error-in-with-django-3-and-django-channels
"""

from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from urllib.parse import parse_qs

@database_sync_to_async
def get_user(token_key):
    print('here')
    try:
        print(1)
        return Token.objects.get(key=token_key).user
    except Token.DoesNotExist:
        print(2)
        return AnonymousUser()


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    see:
    https://channels.readthedocs.io/en/latest/topics/authentication.html#custom-authentication
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        # get the token from the url
        token = parse_qs(self.scope["query_string"].decode("utf8")).get("token")
        if token:
            self.scope['user'] = await get_user(token[0])
        inner = self.inner(self.scope)
        return await inner(receive, send)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))