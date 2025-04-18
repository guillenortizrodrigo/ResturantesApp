from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from payments.models import Payment
from payments.api.serializers import PaymentSerializer

class PaymentsApiViewSet(ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_fields = ["table","statusPayment"]
    ordering_fields = '__all__'