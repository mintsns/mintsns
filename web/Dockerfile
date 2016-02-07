FROM python:3.5-onbuild

RUN pip install django
RUN pip install djangorestframework
RUN pip install markdown
RUN pip install django-filter 

RUN cp -rf /usr/local/lib/python3.5/site-packages/rest_framework/static/rest_framework /usr/src/app/static/