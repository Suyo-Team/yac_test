from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from api.serializers import ChatSerializer
from api.models import Chat

CHATS_URL = reverse('api:chat-list')

def chat_detail_url(chat_id):
    """ Returns the Chat detail url """
    return reverse('api:chat-detail', args=[chat_id])

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


class PublicChatApiTests(TestCase):
    """ Test unauthenticated chat API access """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """ Test autherization is required """
        res = self.client.get(CHATS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateChatApiTests(TestCase):
    """ Test authenticated chat API access """

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
        
        self.client.force_authenticate(user=self.user)

    def test_retrieve_chats(self):
        """ Test retrieving a list of recipes """

        private_chat = sample_chat(*[self.user, self.second_user])
        public_chat = sample_chat(*[self.user, self.second_user], **{
            'private': False, 'chat_name': 'Public Chat'
        })

        res = self.client.get(CHATS_URL)

        chats_list = Chat.objects.all()
        serializer = ChatSerializer(chats_list, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), len(serializer.data))

    def test_retrieve_limited_to_user(self):
        """ Test retrieving chats only ofr active user """
        third_user = create_user(**{
            'username': 'test3',
            'email': 'test3@test3.com',
            'password': 'test3'
        })
        related_chat = sample_chat(*[self.user, self.second_user], **{
            'private': False, 'chat_name': 'Public Chat'
        })
        unrelated_chat = sample_chat(*[self.second_user, third_user])

        res = self.client.get(CHATS_URL)

        chats_user = Chat.objects.filter(users=self.user)
        serializer = ChatSerializer(chats_user, many=True)       

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(len(res.data) == len(serializer.data) == 1)
        self.assertEqual(res.data, serializer.data)

    def test_public_chat_with_no_chat_name(self):
        """ 
        Test that trying to create a public chat without a 
        name returns a bad request
        """
        invalid_public_chat_payload = {
            'private': False,
            'chat_name': '',  # empty chat name
            'users': [self.user.id, self.second_user.id]
        }  
        res = self.client.post(CHATS_URL, invalid_public_chat_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_chat_with_oneself(self):
        """
        Test that trying to create a chat with onself
        returns a bad request
        """
        chat_with_oneself_payload = {
            'private': True,
            'chat_name': '',
            'users': [self.user.id, self.user.id]
        }
        res = self.client.post(CHATS_URL, chat_with_oneself_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_creating_existing_private_chat(self):
        """
        Test that creating a private chat with a user
        that one already has a conversation with returns a 302 
        error (FOUND)
        """
        existing_chat = sample_chat(*[self.user, self.second_user])
        existing_chat_payload = {
            'private': True,
            'chat_name': '',
            'users': [self.user.id, self.second_user.id]
        }
        res = self.client.post(CHATS_URL, existing_chat_payload)

        self.assertEqual(res.status_code, status.HTTP_302_FOUND)

    def test_adding_user_to_public_chat_success(self):
        """ test that adding a new user to a public chat success """
        users_in_chat = [self.user.id, self.second_user.id]
        new_user = create_user(**{
            'username': 'test3',
            'email': 'test3@test3.com',
            'password': 'test3'
        })

        public_chat = sample_chat(*users_in_chat, **{
            'private': False, 
            'chat_name': 'Public Chat'
        })
        users_in_chat.append(new_user.id)
        
        res = self.client.patch(chat_detail_url(public_chat.id), {
            'users': users_in_chat,
            'event': 'new_user_added'
        })

        self.assertEqual(res.status_code, status.HTTP_200_OK)


    def test_adding_user_to_private_chat_fails(self):
        """ Test that we cannot add a new user to a private chat """
        users_in_chat = [self.user.id, self.second_user.id]
        new_user = create_user(**{
            'username': 'test3',
            'email': 'test3@test3.com',
            'password': 'test3'
        })
        private_chat = sample_chat(*users_in_chat)
        users_in_chat.append(new_user.id)
        
        res = self.client.patch(chat_detail_url(private_chat.id), {
            'users': users_in_chat, 
            'event': 'new_user_added'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)