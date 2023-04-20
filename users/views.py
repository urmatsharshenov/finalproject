from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.response import Response

from users.serializers import UserRegisterSerializer

User = get_user_model()


class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "Registered"})
