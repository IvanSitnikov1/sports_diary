from django.db import models


class Exercise(models.Model):
    """Модель упражнения"""
    name = models.CharField(max_length=50)
    photo = models.ImageField()
    description = models.TextField()

    def __str__(self):
        return self.name


class TrainingExercise(models.Model):
    """Модель содержит упражнение и норму его выполнения"""
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    value = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.exercise.name} - {self.value}'

class TrainingDay(models.Model):
    """Модель тренировочного дня"""
    training_exercises = models.ManyToManyField(TrainingExercise)

    def __str__(self):
        return 'list training exercise'


class TrainingProgram(models.Model):
    """Модель программы тренировки"""
    name = models.CharField(max_length=50)
    description = models.TextField()
    training_days = models.ManyToManyField(TrainingDay)

    def __str__(self):
        return self.name
