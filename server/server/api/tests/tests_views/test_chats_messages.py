from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from api.serializers import ChatMessageSerializer, ChatMessageDisplaySerializer, ChatMessageNestedSerializer
from api.models import ChatMessage, Chat

MESSAGES_URL = reverse('api:chatmessage-list')

def chat_detail_url(chat_id):
    """ Returns the Chat detail url """
    return reverse('api:chat-detail', args=[chat_id])

def sample_message(chat, user, **params):
    """Create and return a sample chat"""
    defaults = {        
        'chat_id': chat.id,
        'user_id': user.id,
        'text': 'Sample Message'
    }
    defaults.update(params)
    new_message = ChatMessage.objects.create(**defaults)

def sample_chat(*users, **params):
    """Create and return a sample chat"""
    defaults = {
        'private': True,
        'chat_name': ''
    }
    defaults.update(params)
    new_chat = Chat.objects.create(**defaults)
    new_chat.users.add(*users)

    return new_chat

def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicChatMessageApiTests(TestCase):
    """ Test unauthenticated chat message API access """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """ Test autherization is required """
        res = self.client.get(MESSAGES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateChatMessageApiTests(TestCase):
    """ Test authenticated chat messages API access """

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(**{
            'username': 'test',
            'email': 'test@test.com',
            'password': 'test'
        })
        self.second_user = create_user(**{
            'username': 'test2',
            'email': 'test2@test2.com',
            'password': 'test2'
        })

        self.chat = sample_chat(*[self.user.id, self.second_user.id])        
        self.client.force_authenticate(user=self.user)

    def test_retrieve_chats_messages(self):
        """ Test retrieving a list of messages """

        message_one = sample_message(self.chat, self.user)
        message_two = sample_message(self.chat, self.user, **{'text': 'Second Sample Message'})
        res = self.client.get(MESSAGES_URL)

        messages_list = ChatMessage.objects.all()
        serializer = ChatMessageDisplaySerializer(messages_list, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), len(serializer.data))