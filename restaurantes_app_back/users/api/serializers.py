from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','password'
                  ,'is_active','is_staff']
        

'''class UpdateUserSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        self.partial = kwargs.pop('partial', False)
        super().__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','is_active','is_staff']'''