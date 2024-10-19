from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .manager import *
from django.utils import timezone
# Create your models here.

GENDER_CHOICES = [
    ('male', 'Male'),
    ('female', 'Female'),
    ('others', 'Others'),
]
class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Custom User model that mimics the default Django User model."""

    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default=None, blank=True, null=True)
    photo = models.ImageField(upload_to='userPhotos', blank=True, null=True)
    
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_general_member = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
