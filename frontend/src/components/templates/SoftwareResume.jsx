import React from "react";
import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa";
import "./SoftwareResume.css";

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

function SoftwareResume({ resume }) {
  if (!resume) return null;

  const education = parseList(resume.education, "education");
  const experience = parseList(resume.experience, "experience");
  const projects = parseList(resume.projects, "projects");
  const certifications = parseList(resume.certifications, "certifications");
  const skills = resume.skills ? resume.skills.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="swe-resume-wrapper">
      {/* Top Banner and Header */}
      <header className="swe-resume-header">
        <div className="swe-header-main">
          <h1>{resume.full_name || "developer@domain:~$"}</h1>
          <span className="swe-prompt-pointer">&lt;coder&gt;</span>
        </div>
        <div className="swe-resume-contact">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.address && <span>{resume.address}</span>}
        </div>
        <div className="swe-resume-socials">
          {resume.github && (
            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="swe-social-btn github-btn">
              <FaGithub /> github.com
            </a>
          )}
          {resume.linkedin && (
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="swe-social-btn linkedin-btn">
              <FaLinkedin /> linkedin.com
            </a>
          )}
        </div>
      </header>

      {/* Profile/Summary */}
      {resume.summary && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> cat profile.txt
          </h2>
          <p className="swe-summary-text">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> ./show_skills.sh
          </h2>
          <div className="swe-skills-box">
            {skills.map((skill, idx) => (
              <code key={idx} className="swe-skill-code">[{skill}]</code>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> cat experience.log
          </h2>
          <div className="swe-entries-list">
            {experience.map((exp, idx) => (
              <div key={idx} className="swe-entry-item">
                <div className="swe-entry-header">
                  <h3>
                    <span className="swe-role-text">{exp.role}</span> @ <span className="swe-company-text">{exp.company}</span>
                  </h3>
                  <span className="swe-duration-text">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="swe-description-text pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> git log --projects
          </h2>
          <div className="swe-entries-list">
            {projects.map((proj, idx) => (
              <div key={idx} className="swe-entry-item swe-project-card">
                <div className="swe-entry-header">
                  <h3>
                    <span className="swe-proj-title">{proj.title}</span>
                  </h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="swe-code-link">
                      [src_code]
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="swe-description-text pre-wrap">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> cat education.env
          </h2>
          <div className="swe-entries-list">
            {education.map((edu, idx) => (
              <div key={idx} className="swe-entry-item">
                <div className="swe-entry-header">
                  <h3>
                    <span className="swe-role-text">{edu.degree || "Degree"}</span>
                  </h3>
                  <span className="swe-duration-text">{edu.graduation_year || edu.year}</span>
                </div>
                <div className="swe-edu-details">
                  <code>INSTITUTION="{edu.school_college || edu.school}"</code>
                  {edu.board_university && <code>BOARD_UNIV="{edu.board_university}"</code>}
                  {edu.gpa && <code>GPA="{edu.gpa}"</code>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="swe-resume-section">
          <h2>
            <FaTerminal className="swe-sec-icon" /> ls certifications/
          </h2>
          <ul className="swe-certs-list">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <code>
                  {cert.name} - {cert.issuer || "Unknown"} ({cert.year})
                </code>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default SoftwareResume;
