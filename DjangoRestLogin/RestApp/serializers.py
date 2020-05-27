# api/serializers.py
from rest_framework import serializers
from .models import Messages
from rest_auth.models import TokenModel
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user') 

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Messages
        

    