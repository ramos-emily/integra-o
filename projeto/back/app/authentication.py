from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EDVAuthenticationBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(edv=username)  # Usa EDV ao invés de username
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
