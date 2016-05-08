# coding: utf-8

from rest_framework import serializers

# models
from django.contrib.auth.models import User as AdminUser

# TODO: *SECURITY RISK* DELETE
# Serializers define the API representation.
class AdminUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AdminUser
        fields = ('url', 'username', 'email', 'is_staff')
