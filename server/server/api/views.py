from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets, status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from api.serializers import UserSerializer, RegistrationSerializer


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    API endpoint that allows users to be viewed
    """
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def registration_view(request):

    serializer = RegistrationSerializer(data=request.data)
    data = {}
    status_code = status.HTTP_400_BAD_REQUEST
    if serializer.is_valid():
        new_user = serializer.save()
        data['response'] = "Successfully registered a new user"
        data['email'] = new_user.email
        data['username'] = new_user.username
        data['token'] = new_user.auth_token.key
        status_code = status.HTTP_201_CREATED
    else:
        data = serializer.errors
    
    return Response(data, status=status_code)



