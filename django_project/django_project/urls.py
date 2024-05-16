"""
URL configuration for django_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from django_app import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
import django.contrib.admin as admin
from django.conf import settings


router = routers.DefaultRouter()


# The code snippet you provided is setting up URL routing using Django REST framework's
# `DefaultRouter` and registering viewsets for different resources.
router = routers.DefaultRouter()
router.register(r'events', views.EventModelViewSet)
router.register(r'places', views.PlaceViewSet)
router.register(r'tickets', views.TicketViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'cities', views.CityViewSet, basename= 'cites')

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/register/', views.RegisterView.as_view(), name='auth_register'),
    path('admin/', admin.site.urls),
    path('eventsbycity/<str:city_name>/', views.EventByCityView.as_view(), name='event_by_city'),
    path('placesbycity/<str:city_name>/', views.PlaceByCityView.as_view(), name='place_by_city'),

]
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns