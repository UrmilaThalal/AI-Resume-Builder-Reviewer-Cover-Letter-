import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function CertificationSection({ certificationList, setCertificationList }) {
  const handleChange = (index, field, value) => {
    const updated = [...certificationList];
    updated[index][field] = value;
    setCertificationList(updated);
  };

  const addCert = () => {
    setCertificationList([
      ...certificationList,
      { name: "", issuer: "", year: "" }
    ]);
  };

  const removeCert = (indexToRemove) => {
    const updated = certificationList.filter((_, idx) => idx !== indexToRemove);
    setCertificationList(updated);
  };

  return (
    <div className="section">
      <h2>Certifications</h2>
      <div className="education-entries-container">
        {certificationList.map((cert, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Certification #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeCert(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Certification Name</label>
                <input
                  type="text"
                  value={cert.name || ""}
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  placeholder="E.g. AWS Certified Solutions Architect"
                  required
                />
              </div>
              <div className="input-group">
                <label>Issuing Authority</label>
                <input
                  type="text"
                  value={cert.issuer || ""}
                  onChange={(e) => handleChange(idx, "issuer", e.target.value)}
                  placeholder="E.g. Amazon Web Services"
                  required
                />
              </div>
              <div className="input-group">
                <label>Year Achieved</label>
                <input
                  type="text"
                  value={cert.year || ""}
                  onChange={(e) => handleChange(idx, "year", e.target.value)}
                  placeholder="E.g. 2023"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        {certificationList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#9ca3af", marginBottom: "15px" }}>
            No certifications added yet. Click below to add an entry.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addCert}
        >
          <FaPlus /> Add Certification
        </button>
      </div>
    </div>
  );
}

export default CertificationSection;
