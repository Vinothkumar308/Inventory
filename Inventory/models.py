from django.db import models

# Create your models here.
class Products(models.Model):

    product_id = models.CharField(unique=True,max_length=100)
    product_name = models.CharField(max_length=100)

    def __str__(self):

        return self.product_name


class Location(models.Model):

    location_id = models.CharField(unique=True,max_length=100)
    location_name = models.CharField(max_length=100)

    def __str__(self):

        return self.location_name

class ProductMovement(models.Model):

    product_reference = models.ForeignKey(Products,on_delete=models.CASCADE)
    from_location = models.ForeignKey(Location,related_name="movement_from",on_delete=models.CASCADE)
    to_location = models.ForeignKey(Location,related_name="movement_to",on_delete=models.CASCADE)
    movement_id = models.CharField(unique=True,max_length=100)
    quantity = models.IntegerField(default=1)
    timestamp = models.TimeField(auto_now=True)
