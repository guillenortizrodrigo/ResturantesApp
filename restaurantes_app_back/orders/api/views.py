from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from orders.models import Order
from orders.api.serlializers import OrderSerializer

class OrdersApiViewSet(ModelViewSet):
    permission_classes = []
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_fields = ['table','status','close','payment']
    ordering_field = '__all__'