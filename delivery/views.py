from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from delivery import models, serializers, filters


class CategoryListView(ListAPIView):
    queryset = models.FoodCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [AllowAny]


class FoodListView(ListAPIView):
    queryset = models.Food.objects.select_related("category").all()
    serializer_class = serializers.FoodSerializer
    permission_classes = [AllowAny]
    filterset_class = filters.FoodFilter


class OrderView(ListAPIView):
    serializer_class = serializers.OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return models.Order.objects.filter(user=self.request.user).prefetch_related("food", "food__category")


class CreateOrderView(CreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
