from django.urls import path
from .views import ResumeReviewAPIView

urlpatterns = [
    path("review/", ResumeReviewAPIView.as_view(), name="resume-review"),
]