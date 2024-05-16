from rest_framework import serializers
from .models import EventModel, Place, Ticket, User, TicketCategory
    
class PlaceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Place
        fields = ('__all__')
    def create(self, validated_data):
        return Place.objects.create(**validated_data)

class EventModelSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = EventModel
        fields = ('__all__')

    def create(self, validated_data):
        return EventModel.objects.create(**validated_data)

class TicketCategorySerializer(serializers.ModelSerializer):
    eventTo = EventModelSerializer(read_only=True)

    class Meta:
        model = TicketCategory
        fields = ('__all__')
        
    def create(self, validated_data):
        return TicketCategory.objects.create(**validated_data)
    
class TicketSerializer(serializers.ModelSerializer):
    categoryTo = TicketCategorySerializer(read_only=True)
    userTo = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Ticket
        fields = ('__all__')
    
    def create(self, validated_data):
        return Ticket.objects.create(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
    
class CitySerializer(serializers.Serializer):
    value = serializers.CharField(max_length=100)
    label = serializers.CharField(max_length=100)