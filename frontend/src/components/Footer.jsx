import "./Footer.css";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left */}
        <div className="footer-about">
          <h2>AI Resume Builder</h2>

          <p>
            Create professional resumes, receive AI-powered resume reviews,
            and generate personalized cover letters in one platform.
          </p>
        </div>

        {/* Middle */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <div className="contact-row">
            <FaEnvelope className="footer-icon" />
            <a href="mailto:utsabithalal@gmail.com">
              utsabithalal@gmail.com
            </a>
          </div>

          <div className="contact-row">
            <FaGithub className="footer-icon" />
            <a
              href="https://github.com/UrmilaThalal"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>

          <div className="contact-row">
            <FaLinkedin className="footer-icon" />
            <a
              href="https://www.linkedin.com/in/urmila-thalal-ab69313a8"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="contact-row">
            <FaMapMarkerAlt className="footer-icon" />
            <span>Kathmandu, Nepal</span>
          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        © 2026 AI Resume Builder & Reviewer. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;