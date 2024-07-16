from django.urls import path
from .views import TodoListView, TodoDetailView, TodoStatisticsView

urlpatterns = [
    path('', TodoListView.as_view(), name='todos'),
    path('<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
    path('stats/', TodoStatisticsView.as_view(), name='todos-stats'),
]