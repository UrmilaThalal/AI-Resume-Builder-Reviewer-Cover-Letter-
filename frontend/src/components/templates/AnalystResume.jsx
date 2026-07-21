import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaChartBar } from "react-icons/fa";
import "./AnalystResume.css";

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

function AnalystResume({ resume }) {
  if (!resume) return null;

  const education = parseList(resume.education, "education");
  const experience = parseList(resume.experience, "experience");
  const projects = parseList(resume.projects, "projects");
  const certifications = parseList(resume.certifications, "certifications");
  const skills = resume.skills ? resume.skills.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="analyst-resume-wrapper">
      {/* Header banner block */}
      <header className="analyst-resume-header">
        <div className="analyst-header-title">
          <FaChartBar className="analyst-banner-icon" />
          <div>
            <h1>{resume.full_name || "Data Analyst"}</h1>
            <p className="analyst-subtitle">Data & Operations Analytics Professional</p>
          </div>
        </div>
      </header>

      {/* Main split layout container */}
      <div className="analyst-main-grid">
        {/* Left Column (Sidebar) */}
        <aside className="analyst-sidebar-col">
          <div className="analyst-sidebar-section">
            <h3>Contact Info</h3>
            <div className="analyst-contact-list">
              {resume.email && (
                <div className="contact-item">
                  <FaEnvelope className="sidebar-icon" /> <span>{resume.email}</span>
                </div>
              )}
              {resume.phone && (
                <div className="contact-item">
                  <FaPhone className="sidebar-icon" /> <span>{resume.phone}</span>
                </div>
              )}
              {resume.address && (
                <div className="contact-item">
                  <FaMapMarkerAlt className="sidebar-icon" /> <span>{resume.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="analyst-sidebar-section">
            <h3>Links</h3>
            <div className="analyst-links-list">
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
          </div>

          {skills.length > 0 && (
            <div className="analyst-sidebar-section">
              <h3>Technical Tools</h3>
              <div className="analyst-skills-badges">
                {skills.map((skill, idx) => (
                  <span key={idx} className="analyst-skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="analyst-sidebar-section">
              <h3>Education</h3>
              {education.map((edu, idx) => (
                <div key={idx} className="analyst-edu-item">
                  <span className="analyst-edu-year">{edu.graduation_year || edu.year}</span>
                  <h4>{edu.degree}</h4>
                  <p>{edu.school_college || edu.school}</p>
                  {edu.gpa && <p className="analyst-gpa-text">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Column (Content) */}
        <main className="analyst-content-col">
          {/* Professional Summary */}
          {resume.summary && (
            <section className="analyst-content-section">
              <h2>Executive Summary</h2>
              <div className="analyst-divider"></div>
              <p className="analyst-summary-text">{resume.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section className="analyst-content-section">
              <h2>Professional Experience</h2>
              <div className="analyst-divider"></div>
              <div className="analyst-experience-list">
                {experience.map((exp, idx) => (
                  <div key={idx} className="analyst-exp-item">
                    <div className="analyst-exp-header">
                      <div>
                        <h3>{exp.role}</h3>
                        <h4>{exp.company}</h4>
                      </div>
                      <span className="analyst-exp-date">{exp.duration}</span>
                    </div>
                    {exp.description && (
                      <p className="analyst-exp-description pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="analyst-content-section">
              <h2>Key Analytics Projects</h2>
              <div className="analyst-divider"></div>
              <div className="analyst-experience-list">
                {projects.map((proj, idx) => (
                  <div key={idx} className="analyst-exp-item">
                    <div className="analyst-exp-header">
                      <div>
                        <h3>{proj.title}</h3>
                      </div>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-link">
                          Link
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="analyst-exp-description pre-wrap">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="analyst-content-section">
              <h2>Certifications</h2>
              <div className="analyst-divider"></div>
              <div className="analyst-certs-list">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="analyst-cert-item">
                    <div>
                      <h3>{cert.name}</h3>
                      <p>{cert.issuer}</p>
                    </div>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default AnalystResume;
