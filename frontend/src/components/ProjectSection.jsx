import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function ProjectSection({ projectList, setProjectList }) {
  const handleChange = (index, field, value) => {
    const updated = [...projectList];
    updated[index][field] = value;
    setProjectList(updated);
  };

  const addProject = () => {
    setProjectList([
      ...projectList,
      { title: "", technologies: "", link: "", description: "" }
    ]);
  };

  const removeProject = (indexToRemove) => {
    const updated = projectList.filter((_, idx) => idx !== indexToRemove);
    setProjectList(updated);
  };

  return (
    <div className="section">
      <h2>Projects</h2>
      <div className="education-entries-container">
        {projectList.map((proj, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Project #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeProject(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Project Title</label>
                <input
                  type="text"
                  value={proj.title || ""}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="E.g. E-Commerce Platform"
                  required
                />
              </div>
              <div className="input-group">
                <label>Project Link (Optional)</label>
                <input
                  type="url"
                  value={proj.link || ""}
                  onChange={(e) => handleChange(idx, "link", e.target.value)}
                  placeholder="E.g. https://github.com/myusername/project"
                />
              </div>
            </div>
            <div className="input-group" style={{ marginTop: "15px" }}>
              <label>Project Description</label>
              <textarea
                rows="4"
                value={proj.description || ""}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="E.g. - Developed a secure payment gateway integration using Stripe.&#10;- Configured database caching to reduce latencies."
                required
              ></textarea>
            </div>
          </div>
        ))}
        {projectList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#9ca3af", marginBottom: "15px" }}>
            No projects added yet. Click below to add an entry.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addProject}
        >
          <FaPlus /> Add Project
        </button>
      </div>
    </div>
  );
}

export default ProjectSection;
