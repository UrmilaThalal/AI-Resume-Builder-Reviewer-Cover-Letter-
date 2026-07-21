import google.generativeai as genai
import json
import io
import pdfplumber
import docx

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from resumes.models import Resume
from .models import ResumeReview, CoverLetter
from .serializers import ResumeReviewSerializer, CoverLetterCreateSerializer, CoverLetterSerializer


genai.configure(api_key=settings.GEMINI_API_KEY)


def format_education(education_str):
    try:
        entries = json.loads(education_str)
        if isinstance(entries, list):
            formatted_entries = []
            for entry in entries:
                school = entry.get("school", "")
                degree = entry.get("degree", "")
                gpa = entry.get("gpa", "")
                year = entry.get("year", "")
                parts = []
                if school:
                    parts.append(f"School: {school}")
                if degree:
                    parts.append(f"Degree: {degree}")
                if gpa:
                    parts.append(f"GPA: {gpa}")
                if year:
                    parts.append(f"Year: {year}")
                formatted_entries.append(" | ".join(parts))
            return "\n".join(formatted_entries)
    except Exception:
        pass
    return education_str


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

        data = []
        for r in reviews:
            suggestions_data = r.suggestions
            if isinstance(suggestions_data, dict):
                rating = suggestions_data.get("rating", "Needs Improvement")
                missing_skills = suggestions_data.get("missing_skills", [])
                grammar = suggestions_data.get("grammar", [])
                formatting = suggestions_data.get("formatting", [])
                keywords = suggestions_data.get("keywords", [])
                recommendations = suggestions_data.get("recommendations", [])
            else:
                rating = "N/A"
                missing_skills = []
                grammar = []
                formatting = []
                keywords = []
                recommendations = suggestions_data if isinstance(suggestions_data, list) else []

            data.append({
                "id": r.id,
                "resume_id": r.resume.id,
                "score": r.score,
                "rating": rating,
                "strengths": r.strengths,
                "weaknesses": r.weaknesses,
                "missing_skills": missing_skills,
                "grammar": grammar,
                "formatting": formatting,
                "keywords": keywords,
                "recommendations": recommendations,
                "created_at": r.created_at,
            })

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ResumeReviewSerializer(data=request.data)

        if serializer.is_valid():
            resume_id = serializer.validated_data["resume_id"]

            try:
                # Security check: Ensure resume belongs to the logged-in user
                resume = Resume.objects.get(id=resume_id, user=request.user)

                prompt = f"""
You are an expert resume reviewer and ATS optimization specialist.
Review the following resume.

Name: {resume.full_name}

Summary:
{resume.summary}

Education:
{format_education(resume.education)}

Experience:
{resume.experience}

Skills:
{resume.skills}

Projects:
{resume.projects}

Certifications:
{resume.certifications}

Analyze the resume and return a JSON object with the following keys:
1. "score": An integer score from 0 to 100 based on ATS compliance, formatting, impact, and overall quality.
2. "rating": A brief overall rating string (e.g. "Excellent", "Good", "Needs Improvement").
3. "strengths": A list of strings representing the key strengths of this resume.
4. "weaknesses": A list of strings representing the key weaknesses or gaps.
5. "missing_skills": A list of key industry skills or keywords missing from the resume.
6. "grammar": A list of grammar, punctuation, or style suggestions.
7. "formatting": A list of layout, structure, or formatting improvements.
8. "keywords": A list of optimized keywords to add for better ATS parsing.
9. "recommendations": A list of clear, actionable recommendations for improvement.

Strictly return a valid JSON object matching this structure:
{{
  "score": 85,
  "rating": "Good",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "missing_skills": ["...", "..."],
  "grammar": ["...", "..."],
  "formatting": ["...", "..."],
  "keywords": ["...", "..."],
  "recommendations": ["...", "..."]
}}
"""

                model = genai.GenerativeModel("gemini-2.5-flash")

                # Request JSON output
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
                        "rating": "Needs Improvement",
                        "strengths": ["Resume analyzed successfully."],
                        "weaknesses": ["Could not parse structured review output."],
                        "missing_skills": [],
                        "grammar": [],
                        "formatting": [],
                        "keywords": [],
                        "recommendations": [response.text]
                    }

                # Save review to DB for cache/history, storing new sections inside suggestions
                db_review = ResumeReview.objects.create(
                    user=request.user,
                    resume=resume,
                    score=review_data.get("score", 60),
                    strengths=review_data.get("strengths", []),
                    weaknesses=review_data.get("weaknesses", []),
                    suggestions={
                        "rating": review_data.get("rating", "Needs Improvement"),
                        "missing_skills": review_data.get("missing_skills", []),
                        "grammar": review_data.get("grammar", []),
                        "formatting": review_data.get("formatting", []),
                        "keywords": review_data.get("keywords", []),
                        "recommendations": review_data.get("recommendations", [])
                    }
                )

                # Add database-created ID and fields to response
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


class UploadedResumeReviewAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        print("\n===== UPLOAD RESUME REVIEW REQUEST =====")
        print(f"[UPLOAD] request.FILES keys: {list(request.FILES.keys())}")
        print(f"[UPLOAD] request.content_type: {request.content_type}")

        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            print("[UPLOAD] ERROR: No file found in request.FILES")
            return Response({
                "success": False,
                "step": "File Upload",
                "error": "No file received in request.FILES"
            }, status=status.HTTP_400_BAD_REQUEST)

        file_name = uploaded_file.name
        file_size = uploaded_file.size
        ext = file_name.rsplit(".", 1)[-1].lower() if "." in file_name else ""
        print(f"[UPLOAD] File received: {file_name} ({file_size} bytes), extension: .{ext}")

        if ext not in ["pdf", "docx", "txt"]:
            print(f"[UPLOAD] ERROR: Unsupported file extension: .{ext}")
            return Response({
                "success": False,
                "step": "File Validation",
                "error": f"Unsupported file format '.{ext}'. Please upload PDF, DOCX, or TXT."
            }, status=status.HTTP_400_BAD_REQUEST)

        extracted_text = ""
        try:
            # Reset file cursor to the beginning before reading
            uploaded_file.seek(0)
            file_bytes = uploaded_file.read()
            print(f"[UPLOAD] {ext.upper()} raw bytes read: {len(file_bytes)} bytes")
            
            if ext == "pdf":
                import fitz
                pdf_stream = io.BytesIO(file_bytes)
                try:
                    doc = fitz.open(stream=pdf_stream, filetype="pdf")
                    num_pages = len(doc)
                    print(f"[UPLOAD] PDF pages detected: {num_pages}")
                    for i in range(num_pages):
                        try:
                            page = doc[i]
                            page_text = page.get_text()
                            if page_text:
                                extracted_text += page_text + "\n"
                                print(f"[UPLOAD] Page {i+1}: extracted {len(page_text)} chars")
                            else:
                                print(f"[UPLOAD] Page {i+1}: no text extracted (possibly scanned/image)")
                        except Exception as page_err:
                            return Response({
                                "success": False,
                                "step": "PDF Extraction",
                                "error": f"PyMuPDF could not extract text from page {i+1}: {str(page_err)}"
                            }, status=status.HTTP_400_BAD_REQUEST)
                except Exception as doc_err:
                    return Response({
                        "success": False,
                        "step": "PDF Loading",
                        "error": f"Could not open PDF file: {str(doc_err)}"
                    }, status=status.HTTP_400_BAD_REQUEST)

            elif ext == "docx":
                docx_stream = io.BytesIO(file_bytes)
                try:
                    doc = docx.Document(docx_stream)
                    paragraphs_text = [p.text for p in doc.paragraphs]
                    extracted_text = "\n".join(paragraphs_text)
                    print(f"[UPLOAD] DOCX paragraphs found: {len(paragraphs_text)}")
                except Exception as docx_err:
                    return Response({
                        "success": False,
                        "step": "DOCX Extraction",
                        "error": f"python-docx could not read file: {str(docx_err)}"
                    }, status=status.HTTP_400_BAD_REQUEST)

            else:  # txt
                try:
                    extracted_text = file_bytes.decode("utf-8", errors="ignore")
                except Exception as txt_err:
                    return Response({
                        "success": False,
                        "step": "TXT Extraction",
                        "error": f"Could not decode text file: {str(txt_err)}"
                    }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(f"[UPLOAD] ERROR during file reading: {type(e).__name__}: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response({
                "success": False,
                "step": "File Processing",
                "error": f"Failed to process '{file_name}': {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)

        extracted_text = extracted_text.strip()
        print(f"[UPLOAD] Total extracted text length: {len(extracted_text)} chars")
        print(f"[UPLOAD] First 200 chars: {extracted_text[:200]}")

        if not extracted_text:
            print("[UPLOAD] ERROR: Extracted text is empty after stripping")
            return Response({
                "success": False,
                "step": "Text Extraction",
                "error": "No text could be extracted from the uploaded file. The file may be scanned/image-based or empty."
            }, status=status.HTTP_400_BAD_REQUEST)

        print(f"[UPLOAD] Text extraction successful. Sending to AI for review...")

        prompt = f"""
You are an expert resume reviewer and ATS optimization specialist.
Review the following extracted resume text:

--- BEGIN RESUME TEXT ---
{extracted_text}
--- END RESUME TEXT ---

Analyze the resume and return a JSON object with the following keys:
1. "score": An integer score from 0 to 100 based on ATS compliance, formatting, impact, and overall quality.
2. "rating": A brief overall rating string (e.g. "Excellent", "Good", "Needs Improvement").
3. "strengths": A list of strings representing the key strengths of this resume.
4. "weaknesses": A list of strings representing the key weaknesses or gaps.
5. "missing_skills": A list of key industry skills or keywords missing from the resume.
6. "grammar": A list of grammar, punctuation, or style suggestions.
7. "formatting": A list of layout, structure, or formatting improvements.
8. "keywords": A list of optimized keywords to add for better ATS parsing.
9. "recommendations": A list of clear, actionable recommendations for improvement.

Strictly return a valid JSON object matching this structure:
{{
  "score": 85,
  "rating": "Good",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "missing_skills": ["...", "..."],
  "grammar": ["...", "..."],
  "formatting": ["...", "..."],
  "keywords": ["...", "..."],
  "recommendations": ["...", "..."]
}}
"""

        try:
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
            review_data = json.loads(response.text)
            print(f"[UPLOAD] AI review generated successfully. Score: {review_data.get('score', 'N/A')}")
            return Response(review_data, status=status.HTTP_200_OK)
        except Exception as err:
            print(f"[UPLOAD] ERROR during AI review: {type(err).__name__}: {str(err)}")
            import traceback
            traceback.print_exc()
            return Response({
                "success": False,
                "step": "Gemini API",
                "error": str(err)
            }, status=status.HTTP_400_BAD_REQUEST)



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