from channels.security.websocket import AllowedHostsOriginValidator
# from channels.auth import AuthMiddlewareStack
from api.middleware.authentication import TokenAuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import api.routing

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddlewareStack(
            URLRouter(
                api.routing.websocket_urlpatterns
            )
        )
    )
})

