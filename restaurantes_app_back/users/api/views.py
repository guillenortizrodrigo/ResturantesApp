from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated

#PARA UNA API NORMAL
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password

from users.models import User
from users.api.serializers import UserSerializer

class UserApiViewSet(ModelViewSet):
    permission_class = [IsAdminUser]
    queryset = User.objects.all()

    def get_serializer_class(self):
        return UserSerializer

    def create(self,request,*args,**kargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kargs)
    
    def update(self, request, *args, **kwargs):
        print("ESTAMOS ENTRANDO AQUI")
        kwargs['partial'] = True
        if request.data.get('password'):
            password = request.data.get('password')
            request.data['password'] = make_password(password)
        return super().update(request, *args, **kwargs)

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer =UserSerializer(request.user)
        return Response(serializer.data, status = status.HTTP_200_OK)
        '''auth_header = request.headers.get("Authorization", "No token provided")  # Capturar el token
        print(auth_header)

        return Response({
            "authorization_header": auth_header,  # Token que se envió
        }, status=status.HTTP_200_OK)'''
        