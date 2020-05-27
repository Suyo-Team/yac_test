from django.urls import path,include
from . import views

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('users/',views.ListUser.as_view(),name="users"),
    path('rest-auth/saveMessages/',views.saveMessages.as_view(),name="saveMessages"),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/exist/', views.UserExist.as_view(), name="usersExist"),
]
