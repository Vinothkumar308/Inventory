from rest_framework import serializers
from .models import *

# class ProductMovement_serializer(serializers.ModelSerializer):

#     class Meta:

#         model = ProductMovement
#         fields = "__all__"

class ProductMovementPost_Serializer(serializers.ModelSerializer):

    product_reference = serializers.SlugRelatedField(
        queryset = Products.objects.all(),
        slug_field = 'product_name'
    )

    from_location = serializers.SlugRelatedField(
        queryset = Location.objects.all(),
        slug_field = 'location_name'
    )

    to_location = serializers.SlugRelatedField(
        queryset = Location.objects.all(),
        slug_field = 'location_name'
    )
    
    class Meta:
        model = ProductMovement
        fields = "__all__"