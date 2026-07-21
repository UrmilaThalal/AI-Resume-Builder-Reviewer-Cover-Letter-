import React from "react";
import { FaTrash, FaPlus, FaUsers } from "react-icons/fa";

function ReferenceSection({ referenceList, setReferenceList }) {
  const handleChange = (index, field, value) => {
    const updated = [...referenceList];
    updated[index][field] = value;
    setReferenceList(updated);
  };

  const addReference = () => {
    setReferenceList([...referenceList, { name: "", relationship: "", company: "", email: "", phone: "" }]);
  };

  const removeReference = (indexToRemove) => {
    const updated = referenceList.filter((_, idx) => idx !== indexToRemove);
    setReferenceList(updated);
  };

  return (
    <div className="section-card">
      <div className="section-card-header">
        <FaUsers className="section-icon" />
        <h2>References</h2>
      </div>
      <div className="education-entries-container">
        {referenceList.map((ref, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Reference #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeReference(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Reference Name</label>
                <input
                  type="text"
                  value={ref.name || ""}
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  placeholder="E.g. Dr. John Doe"
                  required
                />
              </div>
              <div className="input-group">
                <label>Relationship</label>
                <input
                  type="text"
                  value={ref.relationship || ""}
                  onChange={(e) => handleChange(idx, "relationship", e.target.value)}
                  placeholder="E.g. Academic Supervisor, Manager"
                  required
                />
              </div>
              <div className="input-group">
                <label>Company / Institution</label>
                <input
                  type="text"
                  value={ref.company || ""}
                  onChange={(e) => handleChange(idx, "company", e.target.value)}
                  placeholder="E.g. Harvard University"
                  required
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={ref.email || ""}
                  onChange={(e) => handleChange(idx, "email", e.target.value)}
                  placeholder="E.g. johndoe@harvard.edu"
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={ref.phone || ""}
                  onChange={(e) => handleChange(idx, "phone", e.target.value)}
                  placeholder="E.g. +1 555-0199"
                />
              </div>
            </div>
          </div>
        ))}
        {referenceList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#94a3b8", marginBottom: "15px" }}>
            No references added yet. Click below to add.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addReference}
        >
          <FaPlus /> Add Reference
        </button>
      </div>
    </div>
  );
}

export default ReferenceSection;
