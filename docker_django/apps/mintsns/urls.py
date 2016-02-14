# from django.conf.urls import url
#
# from . import views
#
# urlpatterns = [
#     url(r'^$', views.home, name='home'),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
# ]
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Restfulなので本来は必要ないが、検証のため
from . import views

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^ping$', views.ping, name='ping'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
