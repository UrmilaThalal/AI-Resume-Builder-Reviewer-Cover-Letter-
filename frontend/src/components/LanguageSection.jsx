import React from "react";
import { FaTrash, FaPlus, FaLanguage } from "react-icons/fa";

function LanguageSection({ languageList, setLanguageList }) {
  const handleChange = (index, field, value) => {
    const updated = [...languageList];
    updated[index][field] = value;
    setLanguageList(updated);
  };

  const addLanguage = () => {
    setLanguageList([...languageList, { language: "", proficiency: "" }]);
  };

  const removeLanguage = (indexToRemove) => {
    const updated = languageList.filter((_, idx) => idx !== indexToRemove);
    setLanguageList(updated);
  };

  return (
    <div className="section-card">
      <div className="section-card-header">
        <FaLanguage className="section-icon" />
        <h2>Languages</h2>
      </div>
      <div className="education-entries-container">
        {languageList.map((lang, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Language #{idx + 1}</h4>
              <button
                type="button"
                className="remove-entry-btn"
                onClick={() => removeLanguage(idx)}
              >
                <FaTrash /> Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>Language</label>
                <input
                  type="text"
                  value={lang.language || ""}
                  onChange={(e) => handleChange(idx, "language", e.target.value)}
                  placeholder="E.g. English, Nepali, Spanish"
                  required
                />
              </div>
              <div className="input-group">
                <label>Proficiency</label>
                <select
                  value={lang.proficiency || ""}
                  onChange={(e) => handleChange(idx, "proficiency", e.target.value)}
                  required
                >
                  <option value="">Select Proficiency</option>
                  <option value="Native / Bilingual">Native / Bilingual</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Elementary">Elementary</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        {languageList.length === 0 && (
          <p className="empty-section-prompt" style={{ fontStyle: "italic", color: "#94a3b8", marginBottom: "15px" }}>
            No languages added yet. Click below to add.
          </p>
        )}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addLanguage}
        >
          <FaPlus /> Add Language
        </button>
      </div>
    </div>
  );
}

export default LanguageSection;
