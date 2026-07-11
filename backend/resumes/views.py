from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Avg
from .models import Resume
from .serializers import ResumeSerializer
from ai_review.models import ResumeReview, CoverLetter

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Calculate stats
        total_resumes = Resume.objects.filter(user=user).count()
        
        # Average AI Review score
        reviews = ResumeReview.objects.filter(user=user)
        avg_score = reviews.aggregate(Avg('score'))['score__avg']
        avg_score = round(avg_score, 1) if avg_score is not None else 0
        
        total_reviews = reviews.count()
        total_cover_letters = CoverLetter.objects.filter(user=user).count()
        
        # Recent Activity (last 3 items created)
        recent_resumes = Resume.objects.filter(user=user).order_by('-created_at')[:3]
        recent_activity = []
        for r in recent_resumes:
            recent_activity.append({
                "id": r.id,
                "type": "Resume",
                "title": r.full_name,
                "description": f"Created on {r.created_at.strftime('%Y-%m-%d')}",
                "date": r.created_at
            })
            
        recent_reviews = ResumeReview.objects.filter(user=user).order_by('-created_at')[:3]
        for rev in recent_reviews:
            recent_activity.append({
                "id": rev.resume.id, # Link back to the resume
                "type": "AI Review",
                "title": f"Review for {rev.resume.full_name}",
                "description": f"Scored {rev.score}% on {rev.created_at.strftime('%Y-%m-%d')}",
                "date": rev.created_at
            })
            
        recent_letters = CoverLetter.objects.filter(user=user).order_by('-created_at')[:3]
        for letter in recent_letters:
            recent_activity.append({
                "id": letter.id, # Link id
                "type": "Cover Letter",
                "title": f"Cover Letter: {letter.job_title} at {letter.company_name}",
                "description": f"Generated on {letter.created_at.strftime('%Y-%m-%d')}",
                "date": letter.created_at
            })
            
        # Sort combined activity by date descending and limit to 5 items
        recent_activity.sort(key=lambda x: x['date'], reverse=True)
        recent_activity = recent_activity[:5]
        
        # Remove datetime objects from JSON response (format to string)
        for act in recent_activity:
            if not isinstance(act['date'], str):
                act['date'] = act['date'].strftime('%Y-%m-%d %H:%M')
                
        return Response({
            "total_resumes": total_resumes,
            "avg_score": avg_score,
            "total_reviews": total_reviews,
            "total_cover_letters": total_cover_letters,
            "recent_activity": recent_activity
        }, status=status.HTTP_200_OK)