from django.urls import path
from .views import *

app_name = 'accounts'
urlpatterns = [
    path('authentication/', authentication, name='authentication'),
    path('logout/', logoutUser, name='logout'),
]