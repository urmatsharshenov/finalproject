from django.urls import path, include
from rest_framework.routers import SimpleRouter

from users import views
from users.views import UsersAPIViewSet

router = SimpleRouter(trailing_slash=False)

router.register(r'', UsersAPIViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
    path("register", views.RegisterAPI.as_view()),
]
