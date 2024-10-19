from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from .models import UserAccount as User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

# Create your views here.
def authentication(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        action = request.POST.get('action') 
        if action == 'submit_email':
            email = request.POST.get('email', '')
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                return JsonResponse({'status': 'exists', 'email': email, 'name': user.first_name})
            else:
                return JsonResponse({'status': 'new', 'email': email})

        elif action == 'login':
            email = request.POST.get('email', '')
            password = request.POST.get('password', '')
            user = authenticate(request, username=email, password=password)

            if user is not None:
                if hasattr(user, 'backend'):
                    login(request, user, backend=user.backend)
                else:
                    backend = settings.AUTHENTICATION_BACKENDS[0]
                    login(request, user, backend=backend)
                return JsonResponse({'status': 'success', 'message': 'Logged in successfully!'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid password.'})

        elif action == 'signup':
            email = request.POST.get('email', '')
            signup_password = request.POST.get('signup_password', '')
            confirm_password = request.POST.get('confirm_password', '')
            if signup_password == confirm_password:
                user = User.objects.create_user(email=email, password=confirm_password)
                backend = settings.AUTHENTICATION_BACKENDS[0]  
                user.backend = backend
                
                login(request, user, backend=user.backend)
                return JsonResponse({'status': 'success', 'message': 'Signed up and logged in successfully!'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Passwords do not match.'})

    return render(request, 'user/login.html')

@login_required
def logoutUser(request):
    logout(request)
    return redirect('/')