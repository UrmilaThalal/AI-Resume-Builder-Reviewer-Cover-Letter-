import React from "react";
import "./ResumeTemplates.css";
import { FaCheck } from "react-icons/fa";

const templatesList = [
  {
    name: "Modern Professional",
    class: "tpl-modern",
    description: "Clean single-column layout"
  },
  {
    name: "Software Engineer",
    class: "tpl-swe",
    description: "Technical ATS layout"
  },
  {
    name: "Data Analyst",
    class: "tpl-analyst",
    description: "Project-focused layout"
  },
  {
    name: "Graphic Designer",
    class: "tpl-designer",
    description: "Creative modern layout"
  },
  {
    name: "Minimal ATS",
    class: "tpl-minimal-ats",
    description: "Simple black & white"
  }
];

function ResumeTemplates({ selectedTemplate, setSelectedTemplate }) {
  return (
    <div className="resume-templates-selector no-print">
      <h2>Select Resume Template</h2>
      <div className="templates-large-grid">
        {templatesList.map((t) => {
          const isActive = selectedTemplate === t.name;
          return (
            <div
              key={t.name}
              className={`template-large-card ${isActive ? "active" : ""}`}
              onClick={() => setSelectedTemplate(t.name)}
            >
              {/* Selected Checkmark Indicator */}
              {isActive && (
                <div className="selected-checkmark-overlay">
                  <FaCheck className="check-icon" />
                </div>
              )}

              {/* Template Card Mockup Preview */}
              <div className={`template-preview-frame ${t.class}`}>
                <div className="mini-paper">
                  {t.name === "Modern Professional" && (
                    <div className="mini-layout-modern">
                      <div className="mini-name-centered"></div>
                      <div className="mini-divider"></div>
                      <div className="mini-row-long"></div>
                      <div className="mini-row-medium"></div>
                      <div className="mini-row-long"></div>
                    </div>
                  )}
                  {t.name === "Software Engineer" && (
                    <div className="mini-layout-swe">
                      <div className="mini-swe-header"></div>
                      <div className="mini-prompt-line">&gt;_</div>
                      <div className="mini-row-long swe-code"></div>
                      <div className="mini-row-medium swe-code"></div>
                    </div>
                  )}
                  {t.name === "Data Analyst" && (
                    <div className="mini-layout-analyst">
                      <div className="mini-sidebar">
                        <div className="mini-side-header"></div>
                        <div className="mini-side-row"></div>
                        <div className="mini-side-row"></div>
                      </div>
                      <div className="mini-main">
                        <div className="mini-row-long"></div>
                        <div className="mini-row-medium"></div>
                      </div>
                    </div>
                  )}
                  {t.name === "Graphic Designer" && (
                    <div className="mini-layout-designer">
                      <div className="mini-top-accent"></div>
                      <div className="mini-design-body">
                        <div className="mini-row-long"></div>
                        <div className="mini-row-medium"></div>
                      </div>
                    </div>
                  )}
                  {t.name === "Minimal ATS" && (
                    <div className="mini-layout-ats">
                      <div className="mini-name-flat"></div>
                      <div className="mini-divider-thin"></div>
                      <div className="mini-row-long"></div>
                      <div className="mini-row-long"></div>
                      <div className="mini-row-long"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card-info-block">
                <h3>{t.name}</h3>
                <p>{t.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResumeTemplates;
export { templatesList };
