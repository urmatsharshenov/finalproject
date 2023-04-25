from django.contrib.auth import get_user_model, authenticate, login, logout
from django.core.exceptions import BadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from users.serializers import UserRegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()


class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "Registered"})


class UsersAPIViewSet(GenericViewSet):
    serializer_class = UserSerializer

    @action(
        methods=['POST'], detail=False, url_path='login',
        serializer_class=LoginSerializer, permission_classes=[],
    )
    @csrf_exempt
    def login(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data.get('username'),
            password=serializer.validated_data.get('password'),
        )

        if not user:
            raise BadRequest(f"Wrong password or username")

        login(request, user)
        return Response(UserSerializer(user).data)

    @action(
        methods=['POST'], detail=False, url_path='logout',
        permission_classes=(IsAuthenticated,)
    )
    def logout(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out'})
