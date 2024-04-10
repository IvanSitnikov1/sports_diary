from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import *
from .serializers import *


class UserModelViewSet(viewsets.ModelViewSet):
    """Создаются точки создания, получения и изменения пользователя"""
    queryset = User.objects.all()
    http_method_names = ['post', 'put', 'get']
    serializer_class = UserSerialiser


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
