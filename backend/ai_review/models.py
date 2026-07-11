from django.db import models
from django.contrib.auth.models import User
from resumes.models import Resume

class ResumeReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="reviews")
    score = models.IntegerField()
    strengths = models.JSONField(default=list)
    weaknesses = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.resume.full_name} ({self.score}%) at {self.created_at}"


class CoverLetter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="cover_letters")
    job_title = models.CharField(max_length=150)
    company_name = models.CharField(max_length=150)
    hiring_manager = models.CharField(max_length=150, blank=True)
    key_skills = models.CharField(max_length=255, blank=True)
    job_description = models.TextField()
    letter_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cover Letter for {self.job_title} at {self.company_name}"
