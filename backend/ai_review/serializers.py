from rest_framework import serializers
from .models import CoverLetter

class ResumeReviewSerializer(serializers.Serializer):
    resume_id = serializers.IntegerField()


class CoverLetterCreateSerializer(serializers.Serializer):
    resume_id = serializers.IntegerField()
    job_title = serializers.CharField(max_length=150)
    company_name = serializers.CharField(max_length=150)
    hiring_manager = serializers.CharField(max_length=150, required=False, allow_blank=True, default="")
    key_skills = serializers.CharField(max_length=255, required=False, allow_blank=True, default="")
    job_description = serializers.CharField()


class CoverLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverLetter
        fields = "__all__"
        read_only_fields = ["user", "created_at", "letter_text"]