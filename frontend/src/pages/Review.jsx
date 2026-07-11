import "./Review.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaStar,
  FaDownload,
  FaRedo,
  FaArrowLeft,
  FaHistory
} from "react-icons/fa";

function Review() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resumeIdParam = searchParams.get("resume_id");

  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    if (selectedResumeId) {
      fetchPastReviews(selectedResumeId);
    }
  }, [selectedResumeId]);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const response = await api.get("/resume/");
      setResumes(response.data);
      if (response.data.length > 0) {
        const targetId = resumeIdParam || response.data[0].id.toString();
        setSelectedResumeId(targetId);
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to load your resumes list.");
    } finally {
      setLoadingResumes(false);
    }
  };

  const fetchPastReviews = async (resumeId) => {
    try {
      setLoadingHistory(true);
      const response = await api.get(`/review/?resume_id=${resumeId}`);
      setPastReviews(response.data);
      // Auto-load latest review if available
      if (response.data.length > 0 && !reviewResult) {
        setReviewResult(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching review history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleReview = async () => {
    if (!selectedResumeId) {
      setError("Please select a resume to review.");
      return;
    }

    try {
      setLoadingReview(true);
      setError("");
      setReviewResult(null);

      const response = await api.post("/review/", {
        resume_id: parseInt(selectedResumeId),
      });

      setReviewResult(response.data);
      // Refresh history list
      fetchPastReviews(selectedResumeId);
    } catch (err) {
      console.error("Error running AI review:", err);
      setError(
        err.response?.data?.error || "Error analyzing resume. Please try again."
      );
    } finally {
      setLoadingReview(false);
    }
  };

  const getScoreCategory = (score) => {
    if (score >= 85) return { text: "Excellent", color: "#10B981" };
    if (score >= 70) return { text: "Good", color: "#F59E0B" };
    return { text: "Needs Improvement", color: "#EF4444" };
  };

  const renderStars = (score) => {
    const starCount = Math.round((score / 100) * 5);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= starCount) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else {
        stars.push(<FaStar key={i} className="empty-star" />);
      }
    }
    return stars;
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="review-page">
      <div className="review-container">
        {/* Back navigation */}
        <Link to="/dashboard" className="back-link no-print">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        {/* Heading */}
        <h1>AI Resume Reviewer</h1>
        <p className="subtitle">
          Select one of your saved resumes to get instant, AI-powered evaluation and ATS-optimization feedback.
        </p>

        {/* Selection Box */}
        <div className="upload-box no-print">
          <FaRobot className="upload-icon" />
          <h2>Select Resume</h2>
          
          {loadingResumes ? (
            <p>Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <div className="no-resumes-warning">
              <p>You haven't built any resumes yet.</p>
              <button
                className="create-btn"
                onClick={() => navigate("/resume-form")}
              >
                Create Resume Now
              </button>
            </div>
          ) : (
            <div className="selection-form">
              <select
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  setReviewResult(null); // Reset layout when target changes
                }}
                className="resume-select"
                disabled={loadingReview}
              >
                {resumes.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.full_name} ({res.email})
                  </option>
                ))}
              </select>

              <button
                className="review-btn"
                onClick={handleReview}
                disabled={loadingReview}
              >
                <FaRobot />
                {loadingReview ? "Analyzing with Gemini..." : "Review Resume"}
              </button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Loading Spinner during Review */}
        {loadingReview && (
          <div className="review-loading">
            <div className="spinner"></div>
            <h3>Gemini is reviewing your layout, structure, and ATS formatting...</h3>
          </div>
        )}

        {/* Review Results */}
        {reviewResult && (
          <div className="review-results-section">
            
            {/* History Feed List (Left sidebar-style panel when history exists) */}
            {pastReviews.length > 1 && (
              <div className="history-sidebar no-print">
                <h3>
                  <FaHistory /> Past Reviews
                </h3>
                <div className="history-list">
                  {pastReviews.map((rev) => (
                    <button
                      key={rev.id}
                      className={`history-item ${reviewResult.id === rev.id ? 'active' : ''}`}
                      onClick={() => setReviewResult(rev)}
                    >
                      <span className="history-score">{rev.score}%</span>
                      <span className="history-date">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Score Card */}
            <div className="score-card">
              <h2>Resume Score</h2>
              <div 
                className="score-circle" 
                style={{ borderColor: getScoreCategory(reviewResult.score).color }}
              >
                {reviewResult.score}%
              </div>

              <div className="stars">
                {renderStars(reviewResult.score)}
              </div>

              <h3>{getScoreCategory(reviewResult.score).text}</h3>
              <p>
                Your resume is evaluated at {reviewResult.score}%. Check the detailed strengths, weaknesses, and improvement checklists below.
              </p>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="results-grid">
              
              <div className="results-card strengths-card">
                <h3>
                  <FaCheckCircle className="icon-green" /> Key Strengths
                </h3>
                <ul>
                  {reviewResult.strengths?.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="results-card weaknesses-card">
                <h3>
                  <FaExclamationTriangle className="icon-orange" /> Areas for Improvement
                </h3>
                <ul>
                  {reviewResult.weaknesses?.map((weak, idx) => (
                    <li key={idx}>{weak}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Suggestions Checklist */}
            <div className="review-result suggestions-section">
              <h2>
                <FaLightbulb className="icon-purple" /> Gemini AI Action Plan
              </h2>
              {reviewResult.suggestions?.map((sug, idx) => (
                <div className="suggestion" key={idx}>
                  <span className="number">{idx + 1}</span>
                  <FaCheckCircle className="check" />
                  <p>{sug}</p>
                </div>
              ))}
            </div>

            {/* Bottom Buttons */}
            <div className="bottom-buttons no-print">
              <button className="download-btn" onClick={handlePrintReport}>
                <FaDownload /> Print Report
              </button>

              <button className="again-btn" onClick={handleReview}>
                <FaRedo /> Review Again
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Review;