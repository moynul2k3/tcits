from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class EmailAuthBackend(BaseBackend):
    """
    Authenticate using an email address and password.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # In Django 3.0+, "username" is used as the key for the email.
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
        except ObjectDoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None