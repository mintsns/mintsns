from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^_/admin/', include(admin.site.urls)),
    url(r'^_/', include('docker_django.apps.mintsns.urls')),

]

urlpatterns += staticfiles_urlpatterns()
