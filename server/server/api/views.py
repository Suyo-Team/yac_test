from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets, status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view

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
def registration_view(request):

    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        new_user = serializer.save()
        data['success'] = True
        data['response'] = "Successfully registered a new user"
        data['email'] = new_user.email
        data['username'] = new_user.username
    else:
        data = serializer.errors
    
    return Response(data)



