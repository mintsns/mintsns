from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Item
from redis import Redis
from rest_framework import viewsets, filters

from .serializers import *

from django.contrib.auth.models import User as AdminUser

# TODO: grpc
# from grpc.beta import implementations
# from protos import customer_service_pb2

# TODO: *SECURITY RISK* DELETEn
# ViewSets define the view behavior.
class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer

# UserのViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


redis = Redis(host='redis', port=6379)


def home(request):
    if request.method == 'POST':
        Item.objects.create(text=request.POST['item_text'])
        return redirect('/')
    items = Item.objects.all()
    counter = redis.incr('counter')
    return render(request, 'home.html', {'items': items, 'counter': counter})

def ping(request):

    # SAMPLE: http://www.grpc.io/docs/installation/python.html
    # SAMPLE: https://github.com/grpc/grpc/tree/master/examples/python/helloworld

    # with customer_service_pb2.early_adopter_create_AVRGateway_stub('localhost', 9494) as stub:
    #     response = stub.MoveServo(gateway_pb2.MoveServoRequest(servo_id=1, position=200), 10)
    #     print "current position: " + str(response.current_position)

    return HttpResponse("pong!!!")

# class TodoViewSet(ModelViewSet):
#     queryset = Todo.objects.all()
#     serializer_class = TodoSerializer
