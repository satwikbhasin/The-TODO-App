from django.urls import path
from .views import UserCreate
from rest_framework.authtoken.views import obtain_auth_token
from .views import TokenValidationView

urlpatterns = [
    path("signup/", UserCreate.as_view(), name="user-signup"),
    path("getToken/", obtain_auth_token, name="obtain-token"),
    path("validateToken/", TokenValidationView.as_view(), name="validate-token"),
]
