from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path, include
from .views import *


router = DefaultRouter()
router.register('exercise', ExerciseViewSet, basename='exercise')
router.register('training-exercise', TrainingExerciseViewSet, basename='training-exercise')
router.register('training-day', TrainingDayViewSet, basename='training-day')
router.register('training-program', TrainingProgramViewSet, basename='training-program')
router.register('users', UserModelViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('drf-auth/', include('rest_framework.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
