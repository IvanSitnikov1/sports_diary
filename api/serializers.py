from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        """Создание пользователя"""
        user = User.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save(update_fields=['password'])
        return user


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