import google.generativeai as genai
import json

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from resumes.models import Resume
from .models import ResumeReview, CoverLetter
from .serializers import ResumeReviewSerializer, CoverLetterCreateSerializer, CoverLetterSerializer


genai.configure(api_key=settings.GEMINI_API_KEY)


class ResumeReviewAPIView(APIView):

    def get(self, request):
        resume_id = request.query_params.get("resume_id")
        if resume_id:
            try:
                # Ensure the resume belongs to the user
                resume = Resume.objects.get(id=resume_id, user=request.user)
                reviews = ResumeReview.objects.filter(resume=resume).order_by("-created_at")
            except Resume.DoesNotExist:
                return Response(
                    {"error": "Resume not found or access denied"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            reviews = ResumeReview.objects.filter(user=request.user).order_by("-created_at")

        data = [{
            "id": r.id,
            "resume_id": r.resume.id,
            "score": r.score,
            "strengths": r.strengths,
            "weaknesses": r.weaknesses,
            "suggestions": r.suggestions,
            "created_at": r.created_at,
        } for r in reviews]

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ResumeReviewSerializer(data=request.data)

        if serializer.is_valid():

            resume_id = serializer.validated_data["resume_id"]

            try:
                # Security check: Ensure resume belongs to the logged-in user
                resume = Resume.objects.get(id=resume_id, user=request.user)

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

Analyze the resume and return a JSON object with the following keys:
1. "score": An integer score out of 100 based on ATS compliance, clarity, skills, and completeness.
2. "strengths": A list of strings representing the key strengths of this resume.
3. "weaknesses": A list of strings representing weaknesses or areas lacking.
4. "suggestions": A list of strings recommending specific improvements.

Example response structure:
{{
  "score": 85,
  "strengths": ["Strong technical skills section", "Clear contact details"],
  "weaknesses": ["Lack of quantifiable metrics in experience section"],
  "suggestions": ["Add numbers to describe impact, e.g., 'reduced page load by 20%'"]
}}
"""

                model = genai.GenerativeModel("gemini-2.5-flash")

                # Request JSON output from Gemini
                response = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )

                try:
                    review_data = json.loads(response.text)
                except Exception as json_err:
                    # Fallback if json parsing fails
                    review_data = {
                        "score": 60,
                        "strengths": ["Resume analyzed successfully."],
                        "weaknesses": ["Could not parse structured strengths/weaknesses."],
                        "suggestions": [response.text]
                    }

                # Save review to DB for cache/history
                db_review = ResumeReview.objects.create(
                    user=request.user,
                    resume=resume,
                    score=review_data.get("score", 60),
                    strengths=review_data.get("strengths", []),
                    weaknesses=review_data.get("weaknesses", []),
                    suggestions=review_data.get("suggestions", []),
                )

                # Add database-created ID to response
                review_data["id"] = db_review.id
                review_data["created_at"] = db_review.created_at

                return Response(
                    review_data,
                    status=status.HTTP_200_OK,
                )

            except Resume.DoesNotExist:
                return Response(
                    {"error": "Resume not found or access denied"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoverLetterAPIView(APIView):

    def get(self, request, pk=None):
        if pk:
            try:
                letter = CoverLetter.objects.get(id=pk, user=request.user)
                return Response({
                    "id": letter.id,
                    "resume_id": letter.resume.id,
                    "job_title": letter.job_title,
                    "company_name": letter.company_name,
                    "hiring_manager": letter.hiring_manager,
                    "key_skills": letter.key_skills,
                    "job_description": letter.job_description,
                    "letter_text": letter.letter_text,
                    "created_at": letter.created_at
                }, status=status.HTTP_200_OK)
            except CoverLetter.DoesNotExist:
                return Response({"error": "Cover letter not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # List view
        letters = CoverLetter.objects.filter(user=request.user).order_by("-created_at")
        data = [{
            "id": l.id,
            "resume_id": l.resume.id,
            "job_title": l.job_title,
            "company_name": l.company_name,
            "created_at": l.created_at
        } for l in letters]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoverLetterCreateSerializer(data=request.data)
        if serializer.is_valid():
            resume_id = serializer.validated_data["resume_id"]
            job_title = serializer.validated_data["job_title"]
            company_name = serializer.validated_data["company_name"]
            hiring_manager = serializer.validated_data.get("hiring_manager", "")
            key_skills = serializer.validated_data.get("key_skills", "")
            job_description = serializer.validated_data["job_description"]

            try:
                # Secure query
                resume = Resume.objects.get(id=resume_id, user=request.user)

                prompt = f"""
You are an expert career counselor and professional resume/cover letter writer.

Generate a highly personalized, compelling, and professional cover letter based on the following candidate resume details and target job description.

--- CANDIDATE DETAILS ---
Name: {resume.full_name}
Summary: {resume.summary}
Education: {resume.education}
Experience: {resume.experience}
Skills: {resume.skills}
Projects: {resume.projects}
Certifications: {resume.certifications}

--- TARGET JOB DETAILS ---
Job Title: {job_title}
Company Name: {company_name}
Hiring Manager: {hiring_manager or "Hiring Manager"}
Key Skills Requested: {key_skills or "Not specified"}
Job Description:
{job_description}

--- INSTRUCTIONS ---
- Structure the letter professionally with a proper greeting and signing off.
- The tone should be enthusiastic, professional, and matching the job description.
- Align the candidate's core strengths, experience, and skills directly to the key requirements of the job description.
- Keep the length around 3-4 paragraphs.
- Do NOT use generic placeholder text. Use the details from the candidate's resume dynamically.
- Do NOT output markdown headings or styling other than double line breaks between paragraphs.
- Do NOT include mock sender/receiver headers, just start from 'Dear [Hiring Manager],' and end with 'Sincerely,\n\n[Candidate Name]'.
"""

                model = genai.GenerativeModel("gemini-2.5-flash")
                response = model.generate_content(prompt)
                letter_text = response.text.strip()

                # Save to database
                cover_letter = CoverLetter.objects.create(
                    user=request.user,
                    resume=resume,
                    job_title=job_title,
                    company_name=company_name,
                    hiring_manager=hiring_manager,
                    key_skills=key_skills,
                    job_description=job_description,
                    letter_text=letter_text
                )

                return Response({
                    "id": cover_letter.id,
                    "resume_id": cover_letter.resume.id,
                    "job_title": cover_letter.job_title,
                    "company_name": cover_letter.company_name,
                    "letter_text": cover_letter.letter_text,
                    "created_at": cover_letter.created_at
                }, status=status.HTTP_201_CREATED)

            except Resume.DoesNotExist:
                return Response({"error": "Resume not found or access denied"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            letter = CoverLetter.objects.get(id=pk, user=request.user)
            letter.delete()
            return Response({"message": "Cover letter deleted successfully"}, status=status.HTTP_200_OK)
        except CoverLetter.DoesNotExist:
            return Response({"error": "Cover letter not found or access denied"}, status=status.HTTP_404_NOT_FOUND)