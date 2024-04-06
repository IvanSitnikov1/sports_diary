from rest_framework import serializers
from .models import *


class ExerciseSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False)
    description = serializers.CharField(required=False)
    class Meta:
        model = Exercise
        fields = '__all__'


class TrainingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingExercise
        fields = '__all__'


class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = '__all__'


class TrainingProgramSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    class Meta:
        model = TrainingProgram
        fields = '__all__'