from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, DashboardStatsAPIView

router = DefaultRouter()
router.register(r"resume", ResumeViewSet, basename="resume")

urlpatterns = [
    path("dashboard/stats/", DashboardStatsAPIView.as_view(), name="dashboard-stats"),
] + router.urls