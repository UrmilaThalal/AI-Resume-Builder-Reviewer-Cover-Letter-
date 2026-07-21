import React from "react";
import { FaTrash, FaPlus, FaAward } from "react-icons/fa";

function AwardSection({ awardList, setAwardList }) {
  const handleChange = (index, field, value) => {
    const updated = [...awardList];
    updated[index][field] = value;
    setAwardList(updated);
  };

  const addAward = () => {
    setAwardList([...awardList, { title: "", issuer: "", year: "", description: "" }]);
  };

  const removeAward = (indexToRemove) => {
    const updated = awardList.filter((_, idx) => idx !== indexToRemove);
    setAwardList(updated);
  };

  return (
    <div className="section-card">
      <div className="section-card-header">
        <FaAward className="section-icon" />
        <h2>Awards & Achievements</h2>
      </div>
      <div className="education-entries-container">
        {awardList.map((award, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Award #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeAward(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Award Title</label>
                <input
                  type="text"
                  value={award.title || ""}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="E.g. Best Employee of the Year"
                  required
                />
              </div>
              <div className="input-group">
                <label>Issuer / Organization</label>
                <input
                  type="text"
                  value={award.issuer || ""}
                  onChange={(e) => handleChange(idx, "issuer", e.target.value)}
                  placeholder="E.g. Forbes Corporation"
                  required
                />
              </div>
              <div className="input-group">
                <label>Year Achieved</label>
                <input
                  type="text"
                  value={award.year || ""}
                  onChange={(e) => handleChange(idx, "year", e.target.value)}
                  placeholder="E.g. 2024"
                  required
                />
              </div>
            </div>
            <div className="input-group" style={{ marginTop: "15px" }}>
              <label>Description</label>
              <textarea
                rows="3"
                value={award.description || ""}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="Describe the significance of this award..."
              ></textarea>
            </div>
          </div>
        ))}
        {awardList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#94a3b8", marginBottom: "15px" }}>
            No awards added yet. Click below to add.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addAward}
        >
          <FaPlus /> Add Award
        </button>
      </div>
    </div>
  );
}

export default AwardSection;
