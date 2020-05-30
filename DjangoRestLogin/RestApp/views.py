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


class saveMessages(generics.ListCreateAPIView):
    queryset = Messages.objects.all().order_by('id')
    serializer_class = serializers.MessagesSerializer