from django.urls import path
from .views import TodoListCreate, TodoRetrieveUpdateDestroy, TodoStats

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-retrieve-update-destroy'),
    path('todos/stats/', TodoStats.as_view(), name='todo-stats'),
]
