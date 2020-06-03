"""
Module to test all the user related operations, like
registrating new users, retrieving the info, and logging in 
"""

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from api.views import UserViewSet, registration_view, CustomAuthToken
from api.serializers import UserSerializer

USERS_URL = reverse('api:user-list')
REGISTER_URL = reverse('api:register')
LOGIN_URL = reverse('api:login')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

TEST_USER = {
    'username': 'test',
    'password': '1234',
}

class PublicUserApiTests(TestCase):
    """
    Test public access to user endpoints, like registering 
    a new user or loging int a new one 
    """

    def setUp(self):
        self.client = APIClient()        
        self.user_login_payload = TEST_USER.copy()
        self.user_create_payload = self.user_login_payload.copy()
        self.user_create_payload.update({'email': 'test@test.com'})

        self.user_register_payload = self.user_create_payload.copy()
        self.user_register_payload.update({
            'password2': self.user_login_payload['password']
        })

    def test_retrieving_users_list_as_anonymous_user(self):
        """
        Test that confirm that trying to retrieve the list 
        of users without being authenticaded firs return a 401 
        Unauthorized status code
        """
        res = self.client.get(USERS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_register_valid_user_success(self):
        """ Test registering a user with valid payload is successful"""
        res = self.client.post(REGISTER_URL, self.user_register_payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)        
        user = get_user_model().objects.get(**res.data['user'])
        self.assertTrue(user.check_password(self.user_register_payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """ Test user already exists """
        create_user(**self.user_create_payload)

        res = self.client.post(REGISTER_URL, self.user_register_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_token_on_created_user_response(self):
        """ 
        Test that the user token is return when a new user is created
        """
        res = self.client.post(REGISTER_URL, self.user_register_payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_register_passwords_do_not_match(self):
        """
        Tests that passing two unmatching passwords returns a bad request
        """
        create_user(**self.user_create_payload)
        invalid_register_user_payload = self.user_create_payload.copy()
        invalid_register_user_payload.update({'password2': 'unmatching_password'})
        
        res = self.client.post(REGISTER_URL, invalid_register_user_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_invalid_email(self):
        """
        Tests that passing an invalid formatted email returns a bad request
        """
        create_user(**self.user_create_payload)
        invalid_register_user_payload = self.user_create_payload.copy()
        invalid_register_user_payload.update({'email': 'ivalid_email'})
        
        res = self.client.post(REGISTER_URL, invalid_register_user_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_successful(self):
        """ Test user login successfully"""
        create_user(**self.user_create_payload)
        res = self.client.post(LOGIN_URL, self.user_login_payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_token_on_user_login(self):
        """
        Test that the user token is return with the response 
        when login
        """
        create_user(**self.user_create_payload)
        res = self.client.post(LOGIN_URL, self.user_login_payload)

        self.assertIn('token', res.data)

    def test_login_invalid_username(self):
        """
        Test that passing and username to the login view returns
        a 400 bad request response
        """
        create_user(**self.user_create_payload)
        invalid_login_user_payload = self.user_login_payload.copy()
        invalid_login_user_payload.update({'username': 'invalid_username'})
        
        res = self.client.post(LOGIN_URL, invalid_login_user_payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        

class PrivateUserApiTests(TestCase):
    """ Test API that requires authentication """

    def setUp(self):
        user_payload = TEST_USER.copy()
        user_payload.update({'email': 'test@test.com'})
        self.user = create_user(**user_payload)

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_list_of_users_success(self):
        """ Test retrieving list og users for logged in users """
        res = self.client.get(USERS_URL)

        user_response_serialized = UserSerializer(self.user).data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, [user_response_serialized])

    def test_post_not_allowed(self):
        """
        Test that post is not allowed on the user url, they
        can only be created through the register url
        """
        res = self.client.post(USERS_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_full_update_not_allowed(self):
        """
        Test that put is not allowed on the user url
        """
        res = self.client.put(USERS_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_partial_update_not_allowed(self):
        """
        Test that patch is not allowed on the user url
        """
        res = self.client.patch(USERS_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)