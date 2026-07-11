from django.urls import path
from .views import ResumeReviewAPIView, CoverLetterAPIView

urlpatterns = [
    path("review/", ResumeReviewAPIView.as_view(), name="resume-review"),
    path("cover-letter/", CoverLetterAPIView.as_view(), name="cover-letter"),
    path("cover-letter/<int:pk>/", CoverLetterAPIView.as_view(), name="cover-letter-detail"),
]