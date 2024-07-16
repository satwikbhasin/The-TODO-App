from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.core.exceptions import ObjectDoesNotExist


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format="json"):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response(
                    {"token": token.key, **serializer.data},
                    status=status.HTTP_201_CREATED,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenValidationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        token_key = request.data.get("token")
        username = request.data.get("username")
        try:
            token = Token.objects.get(key=token_key)
            if token and token.user.username == username:
                return Response({"valid": True}, status=status.HTTP_200_OK)
            else:
                return Response({"valid": False}, status=status.HTTP_400_BAD_REQUEST)
        except Token.DoesNotExist:
            return Response({"valid": False}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
