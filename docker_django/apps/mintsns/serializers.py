from .models import Todo
from rest_framework import serializers

# models
from django.contrib.auth.models import User as AdminUser
from .models import *

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'text')



# TODO: *SECURITY RISK* DELETE
# Serializers define the API representation.
class AdminUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AdminUser
        fields = ('url', 'username', 'email', 'is_staff')

# ユーザーのシリアライザ
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("name", "google_id")
