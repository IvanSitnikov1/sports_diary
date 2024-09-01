from rest_framework.decorators import action
from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from rest_framework.response import Response

from .models import Exercise, ExercisePublic, TrainingProgram
from .serializers import UserSerializer, ExerciseSerializer, \
    TrainingProgramSerializer


class UserModelViewSet(viewsets.ModelViewSet):
    """Создаются точки создания, получения и изменения пользователя"""

    queryset = User.objects.all()
    http_method_names = ['post', 'put', 'get']
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]


class ProfileUserView(generics.GenericAPIView):
    """Получение данных аутентифицированного пользователя"""

    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)

        return Response(serializer.data)


class ExerciseViewSet(viewsets.ModelViewSet):
    """CRUD операции с упражнениями пользователя-автора"""

    serializer_class = ExerciseSerializer

    def get_queryset(self):
        return Exercise.objects.filter(author=self.request.user)

    # добавление упражнения в список публичных
    @action(detail=True)
    def in_public(self, request, pk):
        exercise = Exercise.objects.get(pk=pk)
        exercise_public = ExercisePublic.objects.create(
            name=exercise.name,
            photo=exercise.photo,
            photo_url=exercise.photo_url,
            description=exercise.description,
            author=exercise.author,
        )
        exercise_public.save()

        return Response({'message': 'Exercise added to public.'}, 201)


class ExercisePublicListView(generics.ListAPIView):
    """Получение списка публичных упражнений"""

    queryset = ExercisePublic.objects.all()
    serializer_class = ExerciseSerializer


class ExercisePublicView(generics.RetrieveAPIView):
    """Получение публичного упражнения по id"""

    queryset = ExercisePublic.objects.all()
    serializer_class = ExerciseSerializer


class ExercisePublicDeleteView(generics.DestroyAPIView):
    """Удаление публичного упражнения, при условии, что пользователь - автор"""

    serializer_class = ExerciseSerializer

    def get_queryset(self):
        return Exercise.objects.filter(author=self.request.user)


class TrainingProgramViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingProgramSerializer
    queryset = TrainingProgram.objects.all()
