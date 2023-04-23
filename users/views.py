from django.contrib.auth import get_user_model
from django.contrib.auth.views import LoginView, LogoutView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.serializers import UserRegisterSerializer

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


class LoginView2(LoginView):

    @method_decorator(sensitive_post_parameters())
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        super(LoginView2, self).dispatch(request, *args, **kwargs)
