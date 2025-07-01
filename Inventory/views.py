from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

class ProductsAPI(APIView):
    
    def get(self,request):

        all_products = Products.objects.all()

        product_list = []

        for p in all_products:

            product_dict = {
                "id":p.id,
                "product_id":p.product_id,
                "product_name":p.product_name
            }

            product_list.append(product_dict)

        return Response(product_list)
    
    def post(self,request):
        try:
            new_product = Products(product_id=request.data['product_id'],product_name=request.data['product_name'])
            new_product.save()
            return Response("new product saved")
      
        except Exception as e:
             return Response("error occured"+str(e))

    def patch(self,request,id):

        product = Products.objects.filter(id=id)

        product.update(product_name=request.data['product_name'],product_id=request.data['product_id'])

        return Response("Successfully updated")
    
    def delete(self,request,id):

        try:
            product = Products.objects.get(id=id)

            product.delete()

            return Response("Successfully deleted",status=status.HTTP_204_NO_CONTENT)
       
        except Products.DoesNotExist:
           
           return Response("product not found",status=status.HTTP_404_NOT_FOUND)
           

class LocationAPI(APIView):

    def get(self,request):

        locations = Location.objects.all()

        location_list = []

        for p in locations:

            location_dict = {
                "id":p.id,
                "location_id":p.location_id,
                "location_name":p.location_name
            }

            location_list.append(location_dict)

        return Response(location_list)
    
    def post(self,request):

        new_locations = Location(location_id = request.data['location_id'],location_name = request.data['location_name'])

        new_locations.save()

        return Response("successfully added")

    def patch(self,request,id):

        location = Location.objects.filter(id=id)

        location.update(location_name = request.data['location_name'],location_id = request.data['location_id'])

        return Response("successfully updated")

    def delete(self,request,id):

        location = Location.objects.get(id=id)

        location.delete()

        return Response("succefully deleted")

class ProductMovementAPI(APIView):

    def get(self,request):

        all_ProductMovement = ProductMovement.objects.all()

        all_data = ProductMovementPost_Serializer(all_ProductMovement,many=True).data
        
        return Response(all_data)

    def post(self,request):

        postdata = ProductMovementPost_Serializer(data=request.data)
        if postdata.is_valid():
            postdata.save()
            return Response("Added")
        else:
            return Response(postdata.errors)
        
        # from_location_name = request.data.get('from_location')
        # to_location_name = request.data.get('to_location')
        
        # try:
        #     from_location = Location.objects.get(location_name=from_location_name)
        #     to_location = Location.objects.get(location_name=to_location_name)

        #     product = ProductMovement(product_reference_id=request.data['product_reference'],from_location=from_location,to_location=to_location,movement_id=request.data['movement_id'],quantity=request.data['quantity'])

        #     product.save()

        #     return Response("Added")
        # except Location.DoesNotExist:
        #     return Response({"error":"location doesnot exist"})
    
    def patch(self,request,id):
        try:
            product = ProductMovement.objects.get(id=id)

            product.product_reference_id = request.data.get('product_reference',product.product_reference_id)
            product.movement_id=request.data.get('movement_id',product.movement_id)
            product.quantity = request.data.get('quantity',product.quantity)

            if 'from_location' in request.data:
               from_location_name = request.data['from_location']
               from_location = Location.objects.get(location_name = from_location_name)
               product.from_location = from_location
        
            if 'to_location' in request.data:
               to_location_name = request.data['to_location']
               to_location = Location.objects.get(location_name = to_location_name)
               product.to_location = to_location
        
               product.save()

               return Response("Updated")
        
        except ProductMovement.DoesNotExist:
            return Response({"error":"productmovement not found"})
        
        except Location.DoesNotExist:
            return Response({"error":"location not found"})
    
    def delete(self,request,id):

        product = ProductMovement.objects.get(id=id)
        
        product.delete()

        return Response("successfully delete")
