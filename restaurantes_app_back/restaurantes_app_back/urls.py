"""
URL configuration for restaurantes_app_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.api.router import router_user
from categories.api.router import router_categories
from products.api.router import router_products
from tables.api.router import router_tables
from orders.api.router import router_orders
from payments.api.router import router_payments
import users.api.router

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Genera el esquema OpenAPI 3.0 en formato YAML o JSON
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Vista de Swagger UI para visualizar la documentación interactiva
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/', include(router_user.urls)),
    path('api/', include(users.api.router.urlpatterns)),
    path('api/', include(router_categories.urls)),
    path('api/',include(router_products.urls)),
    path('api/', include(router_tables.urls)),
    path('api/',include(router_orders.urls)),
    path('api/',include(router_payments.urls)),
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
