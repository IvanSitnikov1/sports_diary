from django.shortcuts import render
from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken

from .models import *
from .serializers import *


class UserModelViewSet(viewsets.ModelViewSet):
    """Создаются точки создания, получения и изменения пользователя"""
    queryset = User.objects.all()
    http_method_names = ['post', 'put', 'get']
    serializer_class = UserSerializer


class ProfileUserView(generics.ListAPIView):
    """Получение модели пользователя по токену"""

    serializer_class = UserSerializer

    def get_queryset(self):
        token = self.request.headers.get("Authorization").split(" ")[1]
        try:
            decoded_token = AccessToken(token)
        except TokenError:
            raise PermissionDenied("Invalid token")

        queryset = User.objects.filter(pk=int(decoded_token["user_id"]))
        return queryset


class ExerciseViewSet(viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()


class TrainingExerciseViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingExerciseSerializer
    queryset = TrainingExercise.objects.all()


class TrainingDayViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingDaySerializer
    queryset = TrainingDay.objects.all()


class TrainingProgramViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingProgramSerializer
    queryset = TrainingProgram.objects.all()
