from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
import os
from django_filters.rest_framework import DjangoFilterBackend

from products.models import Product
from products.api.serializers import ProductSerializer

class ProductApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.image:
            image_path = instance.image.path
            if os.path.exists(image_path):
                os.remove(image_path)

        return super().destroy(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if 'image' in request.data:
            old_image_path = instance.image.path
            if os.path.exists(old_image_path):  # Verifica si el archivo existe
                os.remove(old_image_path)
        
        return super().update(request, *args, **kwargs)