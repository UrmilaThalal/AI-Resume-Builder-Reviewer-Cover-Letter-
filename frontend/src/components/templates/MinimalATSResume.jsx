import React from "react";
import "./MinimalATSResume.css";

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

function MinimalATSResume({ resume }) {
  if (!resume) return null;

  const education = parseList(resume.education, "education");
  const experience = parseList(resume.experience, "experience");
  const projects = parseList(resume.projects, "projects");
  const certifications = parseList(resume.certifications, "certifications");
  const skills = resume.skills ? resume.skills.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="ats-resume-wrapper">
      {/* Centered Name and Contact Info */}
      <header className="ats-resume-header">
        <h1>{resume.full_name || "YOUR NAME"}</h1>
        <div className="ats-resume-contact">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.address && <span>{resume.address}</span>}
        </div>
        <div className="ats-resume-contact">
          {resume.linkedin && <span>LinkedIn: {resume.linkedin}</span>}
          {resume.github && <span>GitHub: {resume.github}</span>}
        </div>
      </header>

      {/* Profile/Summary */}
      {resume.summary && (
        <section className="ats-resume-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p className="ats-summary-text">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="ats-resume-section">
          <h2>TECHNICAL SKILLS</h2>
          <p className="ats-skills-line">
            <strong>Skills:</strong> {skills.join(", ")}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="ats-resume-section">
          <h2>PROFESSIONAL EXPERIENCE</h2>
          <div className="ats-entries-list">
            {experience.map((exp, idx) => (
              <div key={idx} className="ats-entry-item">
                <div className="ats-entry-header">
                  <strong>{exp.company}</strong>
                  <span>{exp.duration}</span>
                </div>
                <div className="ats-entry-subheader">
                  <em>{exp.role}</em>
                </div>
                {exp.description && (
                  <p className="ats-description-text pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="ats-resume-section">
          <h2>PROJECTS</h2>
          <div className="ats-entries-list">
            {projects.map((proj, idx) => (
              <div key={idx} className="ats-entry-item">
                <div className="ats-entry-header">
                  <strong>{proj.title}</strong>
                  {proj.link && <span className="ats-proj-link">{proj.link}</span>}
                </div>
                {proj.description && (
                  <p className="ats-description-text pre-wrap">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="ats-resume-section">
          <h2>EDUCATION</h2>
          <div className="ats-entries-list">
            {education.map((edu, idx) => (
              <div key={idx} className="ats-entry-item">
                <div className="ats-entry-header">
                  <strong>{edu.school_college || edu.school}</strong>
                  <span>{edu.graduation_year || edu.year}</span>
                </div>
                <div className="ats-entry-subheader">
                  <em>{edu.degree}</em>
                  {edu.board_university && <span>, {edu.board_university}</span>}
                  {edu.gpa && <span> (GPA: {edu.gpa})</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="ats-resume-section">
          <h2>CERTIFICATIONS</h2>
          <ul className="ats-certs-list">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default MinimalATSResume;
