from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

class TodoStatisticsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total = Todo.objects.filter(user=request.user).count()
        completed = Todo.objects.filter(user=request.user, completed=True).count()
        incomplete = total - completed
        return Response({
            'total': total,
            'completed': completed,
            'incomplete': incomplete
        })
