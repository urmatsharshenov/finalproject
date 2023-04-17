from rest_framework import serializers

from delivery import models


class CategorySerializer(serializers.Serializer):
    name = serializers.CharField()


class FoodSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    price = serializers.IntegerField()
    category = serializers.StringRelatedField()
    image = serializers.ImageField()


class OrderListSerializer(serializers.Serializer):
    created = serializers.DateTimeField(read_only=True)
    total_price = serializers.IntegerField(read_only=True)
    food = FoodSerializer(many=True)
    status = serializers.CharField()


class OrderCreateSerializer(serializers.ModelSerializer):
    food = serializers.PrimaryKeyRelatedField(queryset=models.Food.objects.all(), many=True)

    class Meta:
        model = models.Order
        fields = (
            'food',
        )

    def save(self, **kwargs):
        validated_data = {
            **self.validated_data,
            **kwargs,
            "total_price": sum([i.price for i in self.validated_data["food"]]),
            "status": "started",
        }

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
        else:
            self.instance = self.create(validated_data)

        return self.instance
