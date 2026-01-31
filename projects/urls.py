from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, GeneticIdentityView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('genetic-identity/', GeneticIdentityView.as_view(), name='genetic_identity'),
]