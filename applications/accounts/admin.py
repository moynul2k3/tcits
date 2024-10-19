from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

class UserAccountAdmin(UserAdmin):
    model = UserAccount
    list_display = ('email', 'first_name', 'last_name', 'phone_number', 'gender', 'photo', 'is_general_member', 'is_staff',  'is_active')
    list_filter = ('is_general_member', 'is_staff',  'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'phone_number', 'gender', 'photo')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'phone_number', 'gender', 'photo')}),
        ('Permissions', {'fields': ('is_general_member', 'is_staff',  'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_general_member', 'is_staff',  'is_active')}
        ),
    )

admin.site.register(UserAccount, UserAccountAdmin)