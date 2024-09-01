from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path, include
from .views import ExerciseViewSet, TrainingProgramViewSet, UserModelViewSet, \
    ProfileUserView, ExercisePublicListView, ExercisePublicView, \
    ExercisePublicDeleteView

router = DefaultRouter()

router.register('exercises', ExerciseViewSet, basename='exercises')
router.register('training-programs',
                TrainingProgramViewSet,
                basename='training-programs')
router.register('users', UserModelViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('drf-auth/', include('rest_framework.urls')),
    path(
        'auth/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', ProfileUserView.as_view(), name='get_profile'),
    path('exercises-public/',
         ExercisePublicListView.as_view(),
         name='list_exercises_public'),
    path('exercises-public/<int:pk>/',
         ExercisePublicView.as_view(),
         name='exercise_public'),
    path('exercises-public/<int:pk>/delete/',
         ExercisePublicDeleteView.as_view(),
         name='delete_exercise_public'),
]
