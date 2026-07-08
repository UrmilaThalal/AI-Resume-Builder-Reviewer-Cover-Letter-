from rest_framework import serializers

class ResumeReviewSerializer(serializers.Serializer):
    resume_id = serializers.IntegerField()