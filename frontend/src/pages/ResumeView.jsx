import "./ResumeView.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  FaArrowLeft,
  FaEdit,
  FaRobot,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";

function ResumeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/resume/${id}/`);
      setResume(response.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
      alert("Unable to load resume details.");
      navigate("/resume-list");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="resume-view-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <h2>Loading Resume Layout...</h2>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="resume-view-page">
        <h2>Resume Not Found</h2>
      </div>
    );
  }

  return (
    <div className="resume-view-page">
      {/* Action Bar (Hidden during printing) */}
      <div className="action-bar no-print">
        <button className="back-btn" onClick={() => navigate("/resume-list")}>
          <FaArrowLeft /> Back to List
        </button>
        <div className="action-group">
          <button
            className="action-edit-btn"
            onClick={() => navigate(`/resume-edit/${resume.id}`)}
          >
            <FaEdit /> Edit Resume
          </button>
          <button
            className="action-review-btn"
            onClick={() => navigate(`/review?resume_id=${resume.id}`)}
          >
            <FaRobot /> AI Review
          </button>
          <button className="action-pdf-btn" onClick={handlePrint}>
            <FaDownload /> Print / PDF
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="resume-paper" id="resume-sheet">
        {/* Header Block */}
        <header className="resume-header">
          <h1>{resume.full_name}</h1>
          <div className="contact-info">
            {resume.email && (
              <span>
                <FaEnvelope className="info-icon" /> {resume.email}
              </span>
            )}
            {resume.phone && (
              <span>
                <FaPhone className="info-icon" /> {resume.phone}
              </span>
            )}
            {resume.address && (
              <span>
                <FaMapMarkerAlt className="info-icon" /> {resume.address}
              </span>
            )}
          </div>
          <div className="social-info">
            {resume.linkedin && (
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {resume.github && (
              <a href={resume.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {resume.summary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <div className="section-divider"></div>
            <p className="summary-text">{resume.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience && (
          <section className="resume-section">
            <h2>Work Experience</h2>
            <div className="section-divider"></div>
            <div className="section-content pre-wrap">{resume.experience}</div>
          </section>
        )}

        {/* Education */}
        {resume.education && (
          <section className="resume-section">
            <h2>Education</h2>
            <div className="section-divider"></div>
            <div className="section-content pre-wrap">{resume.education}</div>
          </section>
        )}

        {/* Projects */}
        {resume.projects && (
          <section className="resume-section">
            <h2>Projects</h2>
            <div className="section-divider"></div>
            <div className="section-content pre-wrap">{resume.projects}</div>
          </section>
        )}

        {/* Skills */}
        {resume.skills && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="section-divider"></div>
            <div className="skills-badges">
              {resume.skills.split(",").map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resume.certifications && (
          <section className="resume-section">
            <h2>Certifications</h2>
            <div className="section-divider"></div>
            <div className="section-content pre-wrap">{resume.certifications}</div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumeView;
