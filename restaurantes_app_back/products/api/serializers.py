from rest_framework import serializers
from products.models import Product
from categories.api.serializers import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):

    category_data = CategorySerializer(source='category', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id','title','image','price','active','category','category_data']