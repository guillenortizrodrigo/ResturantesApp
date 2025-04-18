from rest_framework import serializers
from products.api.serializers import ProductSerializer
from tables.api.serializers import TableSerializer
from orders.models import Order

class OrderSerializer(serializers.ModelSerializer):

    product_data = ProductSerializer(source = 'product', read_only=True)
    table_data = TableSerializer(source = 'table', read_only=True)

    class Meta:
        model = Order
        fields = ['id','table','product','status','crated_at','close','product_data','table_data','payment']