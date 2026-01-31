from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from django.views.generic import TemplateView


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class GeneticIdentityView(TemplateView):
    template_name = 'projects/genetic_identity.html'