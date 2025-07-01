from django.urls import path
from .views import *

urlpatterns = [
    path('product/',ProductsAPI.as_view()),
    path('product/<int:id>/',ProductsAPI.as_view()),

    path('location/',LocationAPI.as_view()),
    path('location/<int:id>/',LocationAPI.as_view()),
    
    path('productmovement/',ProductMovementAPI.as_view()),
    path('productmovement/<int:id>/',ProductMovementAPI.as_view()),
]
