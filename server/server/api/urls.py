from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'chats', views.ChatViewSet)
router.register(r'messages', views.ChatMessageViewSet)

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.registration_view, name='register'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
]