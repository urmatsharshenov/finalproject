import django_filters.rest_framework as filters


class FoodFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="food_category")
    price = filters.RangeFilter()
