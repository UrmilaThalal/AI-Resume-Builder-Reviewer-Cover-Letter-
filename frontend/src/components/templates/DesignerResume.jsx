import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaintBrush } from "react-icons/fa";
import "./DesignerResume.css";

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

function DesignerResume({ resume }) {
  if (!resume) return null;

  const education = parseList(resume.education, "education");
  const experience = parseList(resume.experience, "experience");
  const projects = parseList(resume.projects, "projects");
  const certifications = parseList(resume.certifications, "certifications");
  const skills = resume.skills ? resume.skills.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="designer-resume-wrapper">
      {/* Visual Header Block */}
      <header className="designer-resume-header">
        <div className="designer-header-accent"></div>
        <div className="designer-header-main">
          <div className="designer-title-row">
            <FaPaintBrush className="designer-icon-accent" />
            <h1>{resume.full_name || "Portfolio & Resume"}</h1>
          </div>
          <p className="designer-tagline">Visual Creative / Design Strategist</p>
        </div>
      </header>

      {/* Two Column Grid */}
      <div className="designer-grid">
        {/* Left main column */}
        <div className="designer-main-col">
          {resume.summary && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Profile</h2>
              <p className="designer-summary-text">{resume.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Experience</h2>
              <div className="designer-timeline">
                {experience.map((exp, idx) => (
                  <div key={idx} className="designer-timeline-item">
                    <div className="designer-timeline-header">
                      <h3>{exp.role}</h3>
                      <span>{exp.duration}</span>
                    </div>
                    <h4>{exp.company}</h4>
                    {exp.description && (
                      <p className="designer-timeline-desc pre-wrap">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Selected Projects</h2>
              <div className="designer-projects-grid">
                {projects.map((proj, idx) => (
                  <div key={idx} className="designer-project-card">
                    <div className="designer-proj-header">
                      <h3>{proj.title}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                          Link
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="designer-timeline-desc pre-wrap">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right side column */}
        <div className="designer-side-col">
          <section className="designer-section">
            <h2 className="designer-sec-title">Details</h2>
            <div className="designer-details-card">
              {resume.email && (
                <div className="designer-detail-row">
                  <FaEnvelope /> <span>{resume.email}</span>
                </div>
              )}
              {resume.phone && (
                <div className="designer-detail-row">
                  <FaPhone /> <span>{resume.phone}</span>
                </div>
              )}
              {resume.address && (
                <div className="designer-detail-row">
                  <FaMapMarkerAlt /> <span>{resume.address}</span>
                </div>
              )}
            </div>
          </section>

          <section className="designer-section">
            <h2 className="designer-sec-title">On The Web</h2>
            <div className="designer-web-links">
              {resume.linkedin && (
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="designer-link-badge">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {resume.github && (
                <a href={resume.github} target="_blank" rel="noopener noreferrer" className="designer-link-badge">
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </section>

          {skills.length > 0 && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Creative Skills</h2>
              <div className="designer-skills-cloud">
                {skills.map((skill, idx) => (
                  <span key={idx} className="designer-skill-chip">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Education</h2>
              <div className="designer-edu-list">
                {education.map((edu, idx) => (
                  <div key={idx} className="designer-edu-card">
                    <h4>{edu.degree}</h4>
                    <p>{edu.school_college || edu.school}</p>
                    <span>{edu.graduation_year || edu.year}</span>
                    {edu.gpa && <span className="designer-gpa-pill">GPA: {edu.gpa}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="designer-section">
              <h2 className="designer-sec-title">Credentials</h2>
              <div className="designer-edu-list">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="designer-edu-card designer-cert-card">
                    <h4>{cert.name}</h4>
                    <p>{cert.issuer}</p>
                    <span>{cert.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesignerResume;
