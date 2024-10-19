from django.contrib import admin
from django.conf.urls import handler404, handler500, handler403, handler400
from django.shortcuts import render
from django.urls import path
from .views import *

app_name = 'index'
urlpatterns = [
    path('', index, name='index'),
]



# Custom error views
def custom_404(request, exception):
    return render(request, '404.html', status=404)

def custom_500(request):
    return render(request, '500.html', status=500)

def custom_403(request, exception):
    return render(request, '403.html', status=403)

def custom_400(request, exception):
    return render(request, '400.html', status=400)

# Define the handlers for these errors
handler404 = 'myproject.urls.custom_404'
handler500 = 'myproject.urls.custom_500'
handler403 = 'myproject.urls.custom_403'
handler400 = 'myproject.urls.custom_400'
