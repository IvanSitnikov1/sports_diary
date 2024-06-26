"""Тесты для основных HTTP-методов при работе с моделями"""
from django.test import TestCase
from rest_framework import status

from api.models import *


class ModelRequestMethodsTestCase(TestCase):
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

    def test_post(self):
        response_exercise = self.client.post(
            '/api/v1/exercise/',
            data={"name": "deadlift"},
        )
        response_training_program = self.client.post(
            '/api/v1/training-program/',
            data={
                "name": "program 1",
                "description": "description",
                "training_days": [
                    {
                        "training_exercises": [
                            {"exercise": 1, "value": "100/3*20"}
                        ]
                    }
                ]
            },
            content_type='application/json',
        )
        self.assertEqual(response_exercise.status_code,
                         status.HTTP_201_CREATED)
        self.assertEqual(response_training_program.status_code,
                         status.HTTP_201_CREATED)

    def test_get(self):
        response_exercise = self.client.get('/api/v1/exercise/')
        response_exercise_by_id = self.client.get('/api/v1/exercise/1/')
        response_training_program = self.client.get(
            '/api/v1/training-program/',
        )
        response_training_program_by_id = self.client.get(
            '/api/v1/training-program/1/',
        )

        self.assertEqual(response_exercise.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response_exercise_by_id.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response_training_program.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response_training_program_by_id.status_code,
                         status.HTTP_200_OK)

    def test_put(self):
        response_exercise = self.client.put(
            '/api/v1/exercise/1/',
            data={"name": "deadlift_rename"},
            content_type='application/json',
        )
        response_training_program = self.client.put(
            '/api/v1/training-program/1/',
            data={
                "name": "program 1_rename",
                "descriptions": "descriptions_update",
                "training_days": [
                    {
                        "training_exercises": [
                            {"exercise": 1, "value": "100/3*20"},
                            {"exercise": 1, "value": "200/2*10"},
                        ]
                    }
                ]
            },
            content_type='application/json',
        )

        self.assertEqual(response_exercise.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response_training_program.status_code,
                         status.HTTP_200_OK)

    def test_delete(self):
        response_training_program = self.client.delete(
            '/api/v1/training-program/1/',
        )
        response_exercise = self.client.delete(
            '/api/v1/exercise/1/',
        )

        self.assertEqual(response_training_program.status_code,
                         status.HTTP_204_NO_CONTENT)
        self.assertEqual(response_exercise.status_code,
                         status.HTTP_204_NO_CONTENT)
