import google.generativeai as genai

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from resumes.models import Resume
from .serializers import ResumeReviewSerializer


genai.configure(api_key=settings.GEMINI_API_KEY)


class ResumeReviewAPIView(APIView):

    def post(self, request):
        serializer = ResumeReviewSerializer(data=request.data)

        if serializer.is_valid():

            resume_id = serializer.validated_data["resume_id"]

            try:
                resume = Resume.objects.get(id=resume_id)

                prompt = f"""
You are an expert resume reviewer.

Review the following resume.

Name: {resume.full_name}

Summary:
{resume.summary}

Education:
{resume.education}

Experience:
{resume.experience}

Skills:
{resume.skills}

Please provide:

1. Overall Score (out of 100)
2. Strengths
3. Weaknesses
4. Suggestions for Improvement
"""

                model = genai.GenerativeModel("gemini-2.5-flash")

                response = model.generate_content(prompt)

                return Response(
                    {
                        "review": response.text
                    },
                    status=status.HTTP_200_OK,
                )

            except Resume.DoesNotExist:
                return Response(
                    {"error": "Resume not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)