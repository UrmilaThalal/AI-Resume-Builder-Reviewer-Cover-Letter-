import "./ResumeList.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaPlus,
  FaFolderOpen,
  FaArrowLeft,
  FaCode
} from "react-icons/fa";

function ResumeList() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/resume/");
      setResumes(response.data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to fetch resumes. Please try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the resume of "${name}"?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/${id}/`);
      alert("Resume Deleted Successfully!");
      fetchResumes();
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Unable to delete resume.");
    }
  };

  const truncateSkills = (skillsText) => {
    if (!skillsText) return "No skills specified.";
    if (skillsText.length <= 100) return skillsText;
    return skillsText.substring(0, 100) + "...";
  };

  if (loading) {
    return (
      <div className="resume-list-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <h2>Loading Your Resumes...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-list-page">
      <div className="resume-list-container">
        
        {/* Navigation & Header Actions */}
        <div className="list-header-row no-print">
          <Link to="/dashboard" className="back-link-btn">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          {resumes.length > 0 && (
            <button
              className="create-new-btn"
              onClick={() => navigate("/resume-form")}
            >
              <FaPlus /> Build New Resume
            </button>
          )}
        </div>

        <div className="title-section">
          <h1>My Saved Resumes</h1>
          <p className="subtitle">
            View, edit, or delete your built CVs. Run AI evaluations directly from the preview options.
          </p>
        </div>

        {error && <p className="error-message">{error}</p>}

        {resumes.length === 0 ? (
          <div className="empty-state-card">
            <FaFolderOpen className="empty-state-icon" />
            <h2>No Resumes Found</h2>
            <p>You haven't built any resumes yet. Start creating your professional resume to unlock AI reviews and cover letters.</p>
            <button
              className="cta-create-btn"
              onClick={() => navigate("/resume-form")}
            >
              <FaPlus /> Create First Resume
            </button>
          </div>
        ) : (
          <div className="resumes-grid-layout">
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-item-card">
                
                {/* Badge/Icon top */}
                <div className="card-top-icon">
                  <FaFolderOpen />
                </div>

                <div className="card-main-content">
                  <h2>{resume.full_name}</h2>
                  
                  <div className="contact-details">
                    <p className="contact-item">
                      <FaEnvelope className="contact-icon" />
                      <span>{resume.email || "N/A"}</span>
                    </p>
                    <p className="contact-item">
                      <FaPhone className="contact-icon" />
                      <span>{resume.phone || "N/A"}</span>
                    </p>
                  </div>

                  <div className="skills-summary">
                    <h4>
                      <FaCode /> Core Skills:
                    </h4>
                    <p>{truncateSkills(resume.skills)}</p>
                  </div>
                </div>

                {/* Footer and Meta */}
                <div className="card-meta-footer">
                  <span className="date-badge">
                    <FaCalendarAlt /> Created: {new Date(resume.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions Grid */}
                <div className="card-actions-layout">
                  <button
                    className="action-btn view-details-btn"
                    onClick={() => navigate(`/resume-view/${resume.id}`)}
                    title="View Resume Layout"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className="action-btn edit-details-btn"
                    onClick={() => navigate(`/resume-edit/${resume.id}`)}
                    title="Edit Details"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="action-btn delete-details-btn"
                    onClick={() => handleDelete(resume.id, resume.full_name)}
                    title="Delete Permanently"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeList;