from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
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
    training_exercises = TrainingExerciseSerializer(many=True)
    class Meta:
        model = TrainingDay
        fields = '__all__'


class TrainingProgramSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)
    training_days = TrainingDaySerializer(many=True)
    class Meta:
        model = TrainingProgram
        fields = '__all__'

    def create(self, validated_data):
        training_days_data = validated_data.pop('training_days')
        program = TrainingProgram.objects.create(**validated_data)
        for day_data in training_days_data:
            training_exercises_data = day_data.pop('training_exercises')
            day = TrainingDay.objects.create(**day_data)
            for exercise_data in training_exercises_data:
                exercise = TrainingExercise.objects.create(**exercise_data)
                day.training_exercises.add(exercise)
            program.training_days.add(day)
        return program

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description',
                                                  instance.description)
        updated_training_days_data = validated_data.get('training_days', [])
        instance.training_days.all().delete()
        for day_data in updated_training_days_data:
            training_exercises_data = day_data.pop('training_exercises')
            day = TrainingDay.objects.create(**day_data)
            for exercise_data in training_exercises_data:
                exercise = TrainingExercise.objects.create(**exercise_data)
                day.training_exercises.add(exercise)
            instance.training_days.add(day)
        return instance