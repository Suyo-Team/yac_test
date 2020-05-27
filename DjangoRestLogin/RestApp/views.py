from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics

from . import serializers

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  # <-- Here
from .models import *

from django.contrib.auth.models import User
import json

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class UserExist(APIView):
    def post(self, request, *args, **kwargs):
        username =  json.loads(request.body)['username']
        email = json.loads(request.body)['email']
        data = []

        if User.objects.filter(username=username).exists():
            data.append({'message':True})
         
        if User.objects.filter(email=email).exists():    
            data.append({'message':True})
        
        return Response(data) 

class saveMessages(generics.ListCreateAPIView):
    queryset = Messages.objects.all().order_by('id')
    serializer_class = serializers.MessagesSerializer