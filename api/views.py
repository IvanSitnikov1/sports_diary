from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *


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
