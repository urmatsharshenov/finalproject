from django.db import models


# Create your models here.


class FoodCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=255)
    price = models.PositiveIntegerField()
    image = models.ImageField()
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE)


class Order(models.Model):
    food = models.ManyToManyField(Food)
    created = models.DateTimeField(auto_now_add=True)
    total_price = models.PositiveIntegerField()
    status = models.CharField(max_length=255, choices=[(i, i) for i in ("started", "in_progress", "completed")])
    user = models.ForeignKey('users.DeliveryUser', on_delete=models.CASCADE)
