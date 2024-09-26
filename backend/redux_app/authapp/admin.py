from django.contrib import admin
from .models import Profile  # Import the Profile model

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture')  # Fields to display in the admin list view

# Register the Profile model
admin.site.register(Profile, ProfileAdmin)
