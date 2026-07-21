from django.urls import path
from .views import ResumeReviewAPIView, CoverLetterAPIView, UploadedResumeReviewAPIView

urlpatterns = [
    path("review/", ResumeReviewAPIView.as_view(), name="resume-review"),
    path("review/upload/", UploadedResumeReviewAPIView.as_view(), name="resume-review-upload"),
    path("cover-letter/", CoverLetterAPIView.as_view(), name="cover-letter"),
    path("cover-letter/<int:pk>/", CoverLetterAPIView.as_view(), name="cover-letter-detail"),
]