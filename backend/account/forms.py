from django.contrib.auth.forms import UserCreationForm

from . models import User

class SignupForm(UserCreationForm): #pass the user creation model
    class Meta:
        model = User
        fields = ('email', 'name', 'password1', 'password2') #fields wanted