FROM python:3.5-onbuild

RUN pip install django
RUN pip install djangorestframework
RUN pip install markdown
RUN pip install django-filter 

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh