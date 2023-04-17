from django.contrib import admin

from delivery import models

# Register your models here.
admin.site.register(models.Food)
admin.site.register(models.FoodCategory)
admin.site.register(models.Order)
