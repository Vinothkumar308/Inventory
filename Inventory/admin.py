from django.contrib import admin
from .models import *

admin.site.register(Products),
admin.site.register(Location),
admin.site.register(ProductMovement)
