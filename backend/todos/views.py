from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoStats(APIView):
    def get(self, request):
        total = Todo.objects.count()
        completed = Todo.objects.filter(completed=True).count()
        incomplete = total - completed
        return Response({
            'total': total,
            'completed': completed,
            'incomplete': incomplete
        })
