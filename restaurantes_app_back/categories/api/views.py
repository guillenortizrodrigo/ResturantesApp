from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
import os
from django.conf import settings

from categories.models import Category
from categories.api.serializers import CategorySerializer

class CategoryApiViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class =CategorySerializer
    queryset = Category.objects.all()

    def destroy(self, request, *args, **kwargs):
        """Intercepta la solicitud DELETE para eliminar la imagen antes de borrar el objeto."""
        instance = self.get_object()

        # Verifica si la imagen existe y la elimina antes de eliminar la categoría
        if instance.image:
            image_path = instance.image.path  # Ruta absoluta del archivo
            if os.path.exists(image_path):  # Verifica si el archivo existe
                os.remove(image_path)  # Elimina el archivo físico

        # Llamar al método original para continuar con la eliminación del objeto
        return super().destroy(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        """Intercepta la solicitud UPDATE para eliminar la imagen anterior si se sube una nueva."""
        instance = self.get_object()
    
        # Verifica si se está enviando una nueva imagen
        if 'image' in request.data:
            old_image_path = instance.image.path
            if os.path.exists(old_image_path):  # Verifica si el archivo existe
                os.remove(old_image_path)
        # Continúa con la actualización normal del objeto
        return super().update(request, *args, **kwargs)