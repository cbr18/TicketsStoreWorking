from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from .models import EventModel, Place, Ticket, User
from .serializers import EventModelSerializer, PlaceSerializer, TicketSerializer, UserSerializer, CitySerializer
from django.db.models import Count
from rest_framework.views import APIView



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })

class EventModelViewSet(viewsets.ModelViewSet):
    queryset = EventModel.objects.all()
    serializer_class = EventModelSerializer

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class CityEventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventModelSerializer

    def get_queryset(self):
        city_name = self.kwargs.get('city')
        places = Place.objects.filter(city=city_name)
        events = EventModel.objects.filter(place__in=places)
        return events
    

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.values('city').annotate(count=Count('city')).filter(count__gt=0)
    serializer_class = CitySerializer 

    def list(self, request, *args, **kwargs):

        cities_data = [{'value': city['city'], 'label': city['city']} for city in self.queryset]
        return Response(cities_data) 
    
class EventByCityView(generics.ListAPIView):
    serializer_class = EventModelSerializer

    def get_queryset(self):
        city_name = self.kwargs['city_name']
        places = Place.objects.filter(city=city_name)
        events = EventModel.objects.filter(place__in=places)
        return events
    
class PlaceByCityView(generics.ListAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        city_name = self.kwargs['city_name']
        places = Place.objects.filter(city=city_name)
        return places


