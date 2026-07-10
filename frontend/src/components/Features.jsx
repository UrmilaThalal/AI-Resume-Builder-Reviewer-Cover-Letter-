import "./Features.css";
import {
  FaFileAlt,
  FaRobot,
  FaFileSignature,
  FaLock,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features" id="features">

      <div className="section-title">
        <span>OUR FEATURES</span>

        <h2>Everything You Need</h2>

        <p>
          Our platform provides everything you need to create,
          review and improve your resume using AI.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">

          <div className="feature-icon">
            <FaFileAlt />
          </div>

          <h3>Resume Builder</h3>

          <p>
            Build professional ATS-friendly resumes
            with an easy-to-use interface.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaRobot />
          </div>

          <h3>AI Resume Review</h3>

          <p>
            Get intelligent resume suggestions
            powered by Google Gemini AI.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaFileSignature />
          </div>

          <h3>Cover Letter</h3>

          <p>
            Generate professional cover letters
            for any job position instantly.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <FaLock />
          </div>

          <h3>Secure Login</h3>

          <p>
            Secure JWT authentication keeps
            your account protected.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Features;