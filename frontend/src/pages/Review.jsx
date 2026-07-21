import "./Review.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaStar,
  FaDownload,
  FaRedo,
  FaArrowLeft,
  FaHistory,
  FaUpload,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaSpellCheck,
  FaKey,
  FaCode,
  FaRobot
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

  // Upload States
  const [reviewMode, setReviewMode] = useState("saved"); // "saved" or "upload"
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    if (selectedResumeId && reviewMode === "saved") {
      fetchPastReviews(selectedResumeId);
    }
  }, [selectedResumeId, reviewMode]);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const response = await api.get("/resume/");
      setResumes(response.data);
      if (response.data.length > 0) {
        const targetId = resumeIdParam || response.data[0].id.toString();
        setSelectedResumeId(targetId);
      } else {
        // If no saved resumes exist, default review mode to upload
        setReviewMode("upload");
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
      if (response.data.length > 0 && !reviewResult) {
        setReviewResult(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching review history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx", "txt"].includes(ext)) {
      toast.error("Unsupported file format. Please upload PDF, DOCX, or TXT.");
      setUploadedFile(null);
      return;
    }
    setUploadedFile(file);
    setError("");
  };

  const handleReview = async () => {
    if (reviewMode === "saved") {
      if (!selectedResumeId) {
        toast.error("Please select a resume to review.");
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
        fetchPastReviews(selectedResumeId);
        toast.success("Review generated successfully!");
      } catch (err) {
        console.error("Error running AI review:", err);
        setError(
          err.response?.data?.error || "Error analyzing resume. Please try again."
        );
        toast.error("Review generation failed.");
      } finally {
        setLoadingReview(false);
      }
    } else {
      if (!uploadedFile) {
        toast.error("Please select or drag-and-drop a file first.");
        setError("Please select or drag-and-drop a file first.");
        return;
      }

      try {
        setLoadingReview(true);
        setError("");
        setReviewResult(null);

        const formData = new FormData();
        formData.append("file", uploadedFile);

        const response = await api.post("/review/upload/", formData);

        setReviewResult(response.data);
        toast.success("Review generated successfully!");
      } catch (err) {
        console.error("Error running file AI review:", err);
        setError(
          err.response?.data?.error || "Error analyzing uploaded file. Please check format and try again."
        );
        toast.error("Review generation failed.");
      } finally {
        setLoadingReview(false);
      }
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

  const getFileIcon = () => {
    if (!uploadedFile) return <FaUpload className="upload-icon" />;
    const ext = uploadedFile.name.split(".").pop().toLowerCase();
    if (ext === "pdf") return <FaFilePdf className="upload-icon pdf-file-icon" />;
    if (ext === "docx") return <FaFileWord className="upload-icon word-file-icon" />;
    return <FaFileAlt className="upload-icon txt-file-icon" />;
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
          Get instant, AI-powered evaluation and ATS-optimization feedback by selecting a saved resume or uploading your file directly.
        </p>

        {/* Selection Box & Toggle Tabs */}
        <div className="upload-box no-print">
          <div className="mode-toggle-tabs">
            <button
              className={`toggle-tab-btn ${reviewMode === "saved" ? "active" : ""}`}
              onClick={() => {
                setReviewMode("saved");
                setReviewResult(null);
                setError("");
              }}
              disabled={resumes.length === 0}
            >
              Review Saved Resume
            </button>
            <button
              className={`toggle-tab-btn ${reviewMode === "upload" ? "active" : ""}`}
              onClick={() => {
                setReviewMode("upload");
                setReviewResult(null);
                setError("");
              }}
            >
              Upload Resume File
            </button>
          </div>

          {reviewMode === "saved" ? (
            <div className="saved-resume-select-section">
              <h2>Select Saved Resume</h2>
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
                      setReviewResult(null);
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
                </div>
              )}
            </div>
          ) : (
            <div className="file-upload-select-section">
              <h2>Upload Resume File</h2>
              <p className="upload-limit-info">Accepts PDF, DOCX, and TXT formats</p>
              
              <div
                className={`drag-drop-zone ${dragOver ? "dragover" : ""} ${uploadedFile ? "file-selected" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {getFileIcon()}
                {uploadedFile ? (
                  <div className="selected-file-details">
                    <h3>Selected File:</h3>
                    <p className="selected-filename">{uploadedFile.name}</p>
                    <p className="selected-filesize">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p>Drag and drop your file here, or click below to browse</p>
                    <label htmlFor="file-input-id" className="file-input-label">
                      Browse File
                    </label>
                    <input
                      id="file-input-id"
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="action-button-wrapper">
            <button
              className="review-btn"
              onClick={handleReview}
              disabled={loadingReview}
            >
              <FaRobot />
              {loadingReview ? "Analyzing with AI..." : "Review Resume"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Loading Spinner during Review */}
        {loadingReview && (
          <div className="review-loading">
            <div className="spinner"></div>
            <h3>AI is reviewing your content layout, grammatical structure, and ATS formatting optimization...</h3>
          </div>
        )}

        {/* Review Results */}
        {reviewResult && (
          <div className="review-results-section">
            
            {/* History Feed List (Left sidebar-style panel when history exists) */}
            {reviewMode === "saved" && pastReviews.length > 1 && (
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
              <h2>Resume Review Score</h2>
              <div 
                className="score-circle" 
                style={{ borderColor: getScoreCategory(reviewResult.score).color }}
              >
                {reviewResult.score}%
              </div>

              <div className="stars">
                {renderStars(reviewResult.score)}
              </div>

              <h3>{reviewResult.rating || getScoreCategory(reviewResult.score).text}</h3>
              <p>
                Your resume is evaluated at {reviewResult.score}%. Check the detailed recommendations and category suggestions below.
              </p>
            </div>

            {/* Strengths and Weaknesses Grid */}
            <div className="results-grid">
              <div className="results-card strengths-card">
                <h3>
                  <FaCheckCircle className="icon-green" /> Key Strengths
                </h3>
                {reviewResult.strengths && reviewResult.strengths.length > 0 ? (
                  <ul>
                    {reviewResult.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-text">No significant strengths highlighted.</p>
                )}
              </div>

              <div className="results-card weaknesses-card">
                <h3>
                  <FaExclamationTriangle className="icon-orange" /> Areas for Improvement
                </h3>
                {reviewResult.weaknesses && reviewResult.weaknesses.length > 0 ? (
                  <ul>
                    {reviewResult.weaknesses.map((weak, idx) => (
                      <li key={idx}>{weak}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-text">No major gaps identified.</p>
                )}
              </div>
            </div>

            {/* Missing Skills and Keyword Suggestions Grid */}
            <div className="results-grid">
              <div className="results-card missing-skills-card">
                <h3>
                  <FaCode className="icon-purple" /> Missing Skills
                </h3>
                {reviewResult.missing_skills && reviewResult.missing_skills.length > 0 ? (
                  <div className="skills-badge-list">
                    {reviewResult.missing_skills.map((skill, idx) => (
                      <span key={idx} className="missing-skill-badge">{skill}</span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-text">No critical skills missing for target roles.</p>
                )}
              </div>

              <div className="results-card keywords-card">
                <h3>
                  <FaKey className="icon-gold" /> Keyword Suggestions
                </h3>
                {reviewResult.keywords && reviewResult.keywords.length > 0 ? (
                  <div className="skills-badge-list">
                    {reviewResult.keywords.map((kw, idx) => (
                      <span key={idx} className="keyword-suggestion-badge">{kw}</span>
                    ))}
                  </div>
                ) : (
                  <p className="empty-text">ATS keyword optimization matches standard limits.</p>
                )}
              </div>
            </div>

            {/* Grammar and Formatting suggestions */}
            <div className="results-grid">
              <div className="results-card grammar-card">
                <h3>
                  <FaSpellCheck className="icon-blue" /> Grammar Suggestions
                </h3>
                {reviewResult.grammar && reviewResult.grammar.length > 0 ? (
                  <ul>
                    {reviewResult.grammar.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-text">No grammatical issues detected.</p>
                )}
              </div>

              <div className="results-card formatting-card">
                <h3>
                  <FaFileAlt className="icon-teal" /> Formatting Suggestions
                </h3>
                {reviewResult.formatting && reviewResult.formatting.length > 0 ? (
                  <ul>
                    {reviewResult.formatting.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-text">Structure and design are visually polished.</p>
                )}
              </div>
            </div>

            {/* Suggestions/Action Plan Checklist */}
            <div className="review-result suggestions-section">
              <h2>
                <FaLightbulb className="icon-purple" /> AI Recommendation Action Plan
              </h2>
              {reviewResult.recommendations && reviewResult.recommendations.length > 0 ? (
                reviewResult.recommendations.map((rec, idx) => (
                  <div className="suggestion" key={idx}>
                    <span className="number">{idx + 1}</span>
                    <FaCheckCircle className="check" />
                    <p>{rec}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">Review details for actions list.</p>
              )}
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