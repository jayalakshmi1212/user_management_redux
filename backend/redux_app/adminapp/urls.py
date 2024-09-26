from django.urls import path
from . import views

urlpatterns = [
    path('', views.AdminLoginView.as_view(), name='admin_login'),
    path('users/', views.UserListCreateView.as_view(), name='user_list_create'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user_detail'),
]

