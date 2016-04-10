from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^_/admin/', include(admin.site.urls)),
    url(r'^_/', include('docker_django.apps.mintsns.urls')),
]
