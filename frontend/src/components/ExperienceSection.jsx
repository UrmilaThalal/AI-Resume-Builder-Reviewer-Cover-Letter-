import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function ExperienceSection({ experienceList, setExperienceList }) {
  const handleChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { company: "", role: "", duration: "", description: "" }
    ]);
  };

  const removeExperience = (indexToRemove) => {
    const updated = experienceList.filter((_, idx) => idx !== indexToRemove);
    setExperienceList(updated);
  };

  return (
    <div className="section">
      <h2>Work Experience</h2>
      <div className="education-entries-container">
        {experienceList.map((exp, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Experience #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeExperience(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Company / Organization</label>
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => handleChange(idx, "company", e.target.value)}
                  placeholder="E.g. Microsoft Corporation"
                  required
                />
              </div>
              <div className="input-group">
                <label>Job Title / Role</label>
                <input
                  type="text"
                  value={exp.role || ""}
                  onChange={(e) => handleChange(idx, "role", e.target.value)}
                  placeholder="E.g. Software Engineer"
                  required
                />
              </div>
              <div className="input-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={exp.duration || ""}
                  onChange={(e) => handleChange(idx, "duration", e.target.value)}
                  placeholder="E.g. Jan 2022 - Present or 2 Years"
                  required
                />
              </div>
            </div>
            <div className="input-group" style={{ marginTop: "15px" }}>
              <label>Role Description & Key Accomplishments</label>
              <textarea
                rows="4"
                value={exp.description || ""}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="E.g. - Built custom API integrations using Django...&#10;- Led team of 3 developers on dashboard refactoring."
                required
              ></textarea>
            </div>
          </div>
        ))}
        {experienceList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#9ca3af", marginBottom: "15px" }}>
            No work experience added yet. Click below to add an entry.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addExperience}
        >
          <FaPlus /> Add Experience
        </button>
      </div>
    </div>
  );
}

export default ExperienceSection;
