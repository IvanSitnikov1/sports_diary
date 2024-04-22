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
            'photo': '/media/photo_exercises/6307b43b03b7b844244730.jpg',
            'photo_url': None,
            'description': '',
        }
        self.assertEqual(data, expected_data)

    def test_training_program(self):
        data = TrainingProgramSerializer(self.training_program).data
        expected_data = {
            'id': self.training_program.id,
            'name': 'program 1',
            'description': '',
            'training_days': [
                {
                    'id': 1,
                    'training_exercises': [
                        {'id': 1, 'value': '100/3*20', 'exercise': 1}
                    ]
                }
            ],
        }
        self.assertEqual(data, expected_data, f'{data} {expected_data}')
