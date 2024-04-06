from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *


router = DefaultRouter()
router.register('exercise', ExerciseViewSet, basename='exercise')
router.register('training-exercise', TrainingExerciseViewSet, basename='training-exercise')
router.register('training-day', TrainingDayViewSet, basename='training-day')
router.register('training-program', TrainingProgramViewSet, basename='training-program')

urlpatterns = [
    path('', include(router.urls)),
    path('drf-auth/', include('rest_framework.urls'))
]
