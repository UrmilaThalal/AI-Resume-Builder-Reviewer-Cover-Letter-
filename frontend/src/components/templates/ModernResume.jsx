import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import "./ModernResume.css";

const parseList = (data, type) => {
  if (!data) return [];
  if (typeof data !== "string") return Array.isArray(data) ? data : [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    if (type === "education") {
      return [{ school_college: data, degree: "", board_university: "", gpa: "", graduation_year: "" }];
    }
    if (type === "experience") {
      return [{ company: "", role: "", duration: "", description: data }];
    }
    if (type === "projects") {
      return [{ title: data, technologies: "", link: "", description: "" }];
    }
    if (type === "certifications") {
      return [{ name: data, issuer: "", year: "" }];
    }
    return [];
  }
};

function ModernResume({ resume }) {
  if (!resume) return null;

  const education = parseList(resume.education, "education");
  const experience = parseList(resume.experience, "experience");
  const projects = parseList(resume.projects, "projects");
  const certifications = parseList(resume.certifications, "certifications");
  const skills = resume.skills ? resume.skills.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="modern-resume-wrapper">
      {/* Header section */}
      <header className="modern-resume-header">
        <h1>{resume.full_name || "Your Name"}</h1>
        <div className="modern-resume-contact">
          {resume.email && (
            <span>
              <FaEnvelope className="modern-icon" /> {resume.email}
            </span>
          )}
          {resume.phone && (
            <span>
              <FaPhone className="modern-icon" /> {resume.phone}
            </span>
          )}
          {resume.address && (
            <span>
              <FaMapMarkerAlt className="modern-icon" /> {resume.address}
            </span>
          )}
        </div>
        <div className="modern-resume-socials">
          {resume.linkedin && (
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="modern-icon" /> LinkedIn
            </a>
          )}
          {resume.github && (
            <a href={resume.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="modern-icon" /> GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {resume.summary && (
        <section className="modern-resume-section">
          <h2>Professional Summary</h2>
          <div className="modern-section-divider"></div>
          <p className="modern-summary-text">{resume.summary}</p>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="modern-resume-section">
          <h2>Skills</h2>
          <div className="modern-section-divider"></div>
          <div className="modern-skills-grid">
            {skills.map((skill, idx) => (
              <span key={idx} className="modern-skill-badge">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="modern-resume-section">
          <h2>Work Experience</h2>
          <div className="modern-section-divider"></div>
          <div className="modern-entries-list">
            {experience.map((exp, idx) => (
              <div key={idx} className="modern-entry-item">
                <div className="modern-entry-header">
                  <div>
                    <h3>{exp.role}</h3>
                    <h4 className="modern-company-text">{exp.company}</h4>
                  </div>
                  <span className="modern-duration-text">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="modern-description-text pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="modern-resume-section">
          <h2>Education</h2>
          <div className="modern-section-divider"></div>
          <div className="modern-entries-list">
            {education.map((edu, idx) => (
              <div key={idx} className="modern-entry-item">
                <div className="modern-entry-header">
                  <div>
                    <h3>{edu.degree || "Degree"}</h3>
                    <h4 className="modern-school-text">{edu.school_college || edu.school}</h4>
                  </div>
                  <span className="modern-duration-text">{edu.graduation_year || edu.year}</span>
                </div>
                <div className="modern-education-subdetails">
                  {edu.board_university && <span>Board/Univ: {edu.board_university}</span>}
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="modern-resume-section">
          <h2>Projects</h2>
          <div className="modern-section-divider"></div>
          <div className="modern-entries-list">
            {projects.map((proj, idx) => (
              <div key={idx} className="modern-entry-item">
                <div className="modern-entry-header">
                  <div>
                    <h3>{proj.title}</h3>
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="modern-project-link">
                      View Project
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="modern-description-text pre-wrap">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="modern-resume-section">
          <h2>Certifications</h2>
          <div className="modern-section-divider"></div>
          <div className="modern-certs-grid">
            {certifications.map((cert, idx) => (
              <div key={idx} className="modern-cert-card">
                <div className="modern-cert-card-header">
                  <h3>{cert.name}</h3>
                  <span>{cert.year}</span>
                </div>
                {cert.issuer && <p>{cert.issuer}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ModernResume;
