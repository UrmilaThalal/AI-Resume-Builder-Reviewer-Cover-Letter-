import "./CoverLetter.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  FaRobot,
  FaCopy,
  FaDownload,
  FaArrowLeft,
  FaCheck
} from "react-icons/fa";

function CoverLetter() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    hiring_manager: "",
    key_skills: "",
    job_description: "",
  });

  const [generatedLetter, setGeneratedLetter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      const response = await api.get("/resume/");
      setResumes(response.data);
      if (response.data.length > 0) {
        setSelectedResumeId(response.data[0].id.toString());
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to load your resumes list.");
    } finally {
      setLoadingResumes(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    if (!selectedResumeId) {
      setError("Please select a resume to base your cover letter on.");
      return;
    }
    if (!formData.job_title || !formData.company_name || !formData.job_description) {
      setError("Please fill in Job Title, Company Name, and Job Description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGeneratedLetter("");

      const response = await api.post("/cover-letter/", {
        resume_id: parseInt(selectedResumeId),
        job_title: formData.job_title,
        company_name: formData.company_name,
        hiring_manager: formData.hiring_manager,
        key_skills: formData.key_skills,
        job_description: formData.job_description,
      });

      setGeneratedLetter(response.data.letter_text);
    } catch (err) {
      console.error("Error generating cover letter:", err);
      setError(
        err.response?.data?.error || "Error generating cover letter. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cover-page">
      <div className="cover-container">
        {/* Back Link */}
        <Link to="/dashboard" className="back-link no-print">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="no-print">AI Cover Letter Generator</h1>
        <p className="subtitle no-print">
          Generate a personalized and professional cover letter in seconds.
        </p>

        {/* Setup Parameters (Hidden when printing if we want to print just the letter) */}
        <div className="section no-print">
          
          {loadingResumes ? (
            <p>Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <div className="no-resumes-warning">
              <p>You need to create a resume first to generate a cover letter.</p>
              <Link to="/resume-form">
                <button className="create-btn">Create Resume Now</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="input-group" style={{ marginBottom: "20px" }}>
                <label>Select Base Resume</label>
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="resume-select"
                  disabled={loading}
                >
                  {resumes.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.full_name} ({res.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>
                    Hiring Manager
                    <span className="optional">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="hiring_manager"
                    value={formData.hiring_manager}
                    onChange={handleChange}
                    placeholder="Hiring manager name"
                    disabled={loading}
                  />
                </div>

                <div className="input-group">
                  <label>
                    Key Skills
                    <span className="optional">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="key_skills"
                    value={formData.key_skills}
                    onChange={handleChange}
                    placeholder="React, Django, PostgreSQL..."
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Job Description</label>
                <textarea
                  rows="7"
                  name="job_description"
                  value={formData.job_description}
                  onChange={handleChange}
                  placeholder="Paste the job description here..."
                  disabled={loading}
                  required
                ></textarea>
              </div>

              <div className="button-area">
                <button
                  className="generate-btn"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <FaRobot />
                  {loading ? "Generating with Gemini..." : "Generate Cover Letter"}
                </button>
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Loader Display */}
        {loading && (
          <div className="review-loading no-print">
            <div className="spinner"></div>
            <h3>Compiling resume credentials and aligning skills with job description...</h3>
          </div>
        )}

        {/* Generated Letter Preview */}
        {generatedLetter && (
          <div className="preview-card" id="printable-letter-card">
            <h2 className="no-print">Generated Cover Letter</h2>
            
            <div className="preview-box printable-letter-body">
              {generatedLetter.split("\n").map((para, index) => (
                <span key={index}>
                  {para}
                  <br />
                </span>
              ))}
            </div>

            <div className="bottom-buttons no-print">
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? (
                  <>
                    <FaCheck className="icon-green" /> Copied!
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy
                  </>
                )}
              </button>

              <button className="download-btn" onClick={handlePrint}>
                <FaDownload /> Print / PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverLetter;