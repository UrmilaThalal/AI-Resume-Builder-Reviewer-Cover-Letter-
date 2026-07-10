import "./CoverLetter.css";
import {
  FaRobot,
  FaCopy,
  FaDownload
} from "react-icons/fa";

function CoverLetter() {

  return (

    <div className="cover-page">

      <div className="cover-container">

        <h1>AI Cover Letter Generator</h1>

        <p className="subtitle">
          Generate a personalized and professional cover letter in seconds.
        </p>

        {/* Form */}

        <div className="section">

          <div className="form-grid">

            <div className="input-group">

              <label>Job Title</label>

              <input
                type="text"
                placeholder="Enter job title"
              />

            </div>

            <div className="input-group">

              <label>Company Name</label>

              <input
                type="text"
                placeholder="Enter company name"
              />

            </div>

            <div className="input-group">

              <label>
                Hiring Manager
                <span className="optional">
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                placeholder="Hiring manager name"
              />

            </div>

            <div className="input-group">

              <label>
                Key Skills
                <span className="optional">
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                placeholder="React, Django, PostgreSQL..."
              />

            </div>

          </div>

          <div className="input-group">

            <label>Job Description</label>

            <textarea
              rows="7"
              placeholder="Paste the job description here..."
            ></textarea>

          </div>

          <div className="button-area">

            <button className="generate-btn">

              <FaRobot />

              Generate Cover Letter

            </button>

          </div>

        </div>

        {/* Preview */}

        <div className="preview-card">

          <h2>Generated Cover Letter</h2>

          <div className="preview-box">

            <p>

              Dear Hiring Manager,

            </p>

            <br />

            <p>

              I am excited to apply for this position. My background in software development, problem solving and modern web technologies makes me a strong candidate for this role.

            </p>

            <br />

            <p>

              I have experience working with React, Django and PostgreSQL while building full-stack applications. I enjoy learning new technologies and working in collaborative environments.

            </p>

            <br />

            <p>

              Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your organization.

            </p>

            <br />

            <p>

              Sincerely,

            </p>

            <p>

              Your Name

            </p>

          </div>

          <div className="bottom-buttons">

            <button className="copy-btn">

              <FaCopy />

              Copy

            </button>

            <button className="download-btn">

              <FaDownload />

              Download PDF

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CoverLetter;