from rest_framework.routers import DefaultRouter
from tables.api.views import TableModelViewSet

router_tables = DefaultRouter()

router_tables.register(
    prefix = 'tables', basename = 'tables', viewset = TableModelViewSet
)