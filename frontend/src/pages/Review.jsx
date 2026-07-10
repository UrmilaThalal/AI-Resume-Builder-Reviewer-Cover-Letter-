import "./Review.css";
import {
  FaUpload,
  FaRobot,
  FaCheckCircle,
  FaStar,
  FaDownload,
  FaRedo,
  FaFilePdf
} from "react-icons/fa";

function Review() {
  return (
    <div className="review-page">

      <div className="review-container">

        {/* Heading */}

        <h1>AI Resume Review</h1>

        <p className="subtitle">
          Upload your resume and receive AI-powered feedback to improve your resume and ATS score.
        </p>

        {/* Upload Box */}

        <div className="upload-box">

          <FaUpload className="upload-icon" />

          <h2>Upload Resume</h2>

          <p>
            Upload your resume in PDF format for AI analysis.
          </p>

          <div className="upload-info">

            <FaFilePdf className="pdf-icon" />

            <span>Supported Format: PDF (.pdf)</span>

          </div>

          <input
            type="file"
            accept=".pdf"
          />

          <button className="review-btn">

            <FaRobot />

            Review Resume

          </button>

        </div>

        {/* Resume Score */}

        <div className="score-card">

          <h2>Resume Score</h2>

          <div className="score-circle">

            87%

          </div>

          <div className="stars">

            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="empty-star" />

          </div>

          <h3>Excellent</h3>

          <p>
            Your resume is ATS friendly but still has room for improvement.
          </p>

        </div>

        {/* Suggestions */}

        <div className="review-result">

          <h2>AI Suggestions</h2>

          <div className="suggestion">
            <span className="number">1</span>
            <FaCheckCircle className="check" />
            <p>Add measurable achievements to your work experience.</p>
          </div>

          <div className="suggestion">
            <span className="number">2</span>
            <FaCheckCircle className="check" />
            <p>Improve your professional summary using stronger keywords.</p>
          </div>

          <div className="suggestion">
            <span className="number">3</span>
            <FaCheckCircle className="check" />
            <p>Add more technical skills related to your target job.</p>
          </div>

          <div className="suggestion">
            <span className="number">4</span>
            <FaCheckCircle className="check" />
            <p>Include academic or personal projects with technologies used.</p>
          </div>

          <div className="suggestion">
            <span className="number">5</span>
            <FaCheckCircle className="check" />
            <p>Maintain consistent formatting throughout the resume.</p>
          </div>

        </div>

        {/* Bottom Buttons */}

        <div className="bottom-buttons">

          <button className="download-btn">

            <FaDownload />

            Download Report

          </button>

          <button className="again-btn">

            <FaRedo />

            Review Again

          </button>

        </div>

      </div>

    </div>
  );
}

export default Review;