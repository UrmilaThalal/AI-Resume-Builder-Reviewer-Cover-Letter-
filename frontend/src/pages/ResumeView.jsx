import "./ResumeView.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaEdit,
  FaRobot,
  FaDownload
} from "react-icons/fa";
import ResumePreview from "../components/ResumePreview";

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
      toast.error("Unable to load resume details.");
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
      <div className="resume-view-sheet-container" id="resume-sheet">
        <ResumePreview resume={resume} template={resume.template} />
      </div>
    </div>
  );
}

export default ResumeView;
