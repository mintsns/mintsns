# from django.conf.urls import url
#
# from . import views
#
# urlpatterns = [
#     url(r'^$', views.home, name='home'),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
# ]
from django.conf.urls import url, include

# view sets
from rest_framework import routers, serializers, viewsets

# view set
from .views import AdminUserViewSet

# Restfulなので本来は必要ないが、検証のため
from . import views

# TODO: *SECURITY RISK* DELETE
# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'admin-users', AdminUserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^ping$', views.ping, name='ping'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
