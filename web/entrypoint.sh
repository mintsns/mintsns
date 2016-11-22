#!/bin/bash

function update_restframework_static_files() {
    local AM=$(stat /usr/local/lib/python3.5/site-packages/rest_framework/static/rest_framework | grep Modify)
    local BM=$(stat /www/static/rest_framework | grep Modify)
    echo $AM
    echo $BM
    if [ AM != BM ]; then
      cp -rfa /usr/local/lib/python3.5/site-packages/rest_framework/static/rest_framework /www/static/rest_framework
    fi
}
update_restframework_static_files

/usr/local/bin/gunicorn docker_django.wsgi:application -w 2 -b :8000