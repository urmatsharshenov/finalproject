from django.urls import path

from delivery import views

urlpatterns = [
    path("food-list", views.FoodListView.as_view()),
    path("category-list", views.CategoryListView.as_view()),
    path("user-order", views.OrderView.as_view()),
    path("create-order", views.CreateOrderView.as_view()),
]
