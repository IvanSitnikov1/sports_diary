"""Тесты для сериализаторов"""
from django.test import TestCase

from api.serializers import *
from api.models import *


class SerializersTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.exercise = Exercise.objects.create(name='deadlift')
        cls.training_exercise = TrainingExercise.objects.create(
            exercise=cls.exercise,
            value='100/3*20',
        )
        cls.training_day = TrainingDay.objects.create()
        cls.training_day.training_exercises.add(cls.training_exercise)
        cls.training_program = TrainingProgram.objects.create(name='program 1')
        cls.training_program.training_days.add(cls.training_day)
    def test_exercise(self):
        data = ExerciseSerializer(self.exercise).data
        expected_data = {
            'id': self.exercise.id,
            'name': 'deadlift',
            'photo': None,
            'description': '',
        }
        self.assertEqual(data, expected_data)

    def test_training_exercise(self):
        data = TrainingExerciseSerializer(self.training_exercise).data
        expected_data = {
            'id': self.training_exercise.id,
            'exercise': self.exercise.id,
            'value': '100/3*20',
        }
        self.assertEqual(data, expected_data)

    def test_training_day(self):
        data = TrainingDaySerializer(self.training_day).data
        expected_data = {
            'id': self.training_day.id,
            'training_exercises': [self.training_exercise.id],
        }
        self.assertEqual(data, expected_data)

    def test_training_program(self):
        data = TrainingProgramSerializer(self.training_program).data
        expected_data = {
            'id': self.training_program.id,
            'name': 'program 1',
            'description': '',
            'training_days': [self.training_day.id],
        }
        self.assertEqual(data, expected_data)
