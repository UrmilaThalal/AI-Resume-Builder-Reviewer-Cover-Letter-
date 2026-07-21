import React from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

function EducationSection({ educationList, setEducationList }) {
  const handleEduChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { school_college: "", degree: "", board_university: "", gpa: "", graduation_year: "" }
    ]);
  };

  const removeEducation = (indexToRemove) => {
    if (educationList.length === 1) {
      // Allow emptying it or just reset to empty card
      setEducationList([{ school_college: "", degree: "", board_university: "", gpa: "", graduation_year: "" }]);
      return;
    }
    const updated = educationList.filter((_, idx) => idx !== indexToRemove);
    setEducationList(updated);
  };

  return (
    <div className="section">
      <h2>Education</h2>
      <div className="education-entries-container">
        {educationList.map((edu, idx) => (
          <div key={idx} className="education-card-entry">
            <div className="card-entry-header">
              <h4>Education Record #{idx + 1}</h4>
              {(educationList.length > 1 || edu.school_college || edu.degree) && (
                <button
                  type="button"
                  className="remove-entry-btn"
                  onClick={() => removeEducation(idx)}
                >
                  <FaTrash /> Remove
                </button>
              )}
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label>School / College</label>
                <input
                  type="text"
                  value={edu.school_college || edu.school || ""}
                  onChange={(e) => handleEduChange(idx, "school_college", e.target.value)}
                  placeholder="E.g. St. Xavier's College"
                  required
                />
              </div>
              <div className="input-group">
                <label>Degree / Qualification</label>
                <input
                  type="text"
                  value={edu.degree || ""}
                  onChange={(e) => handleEduChange(idx, "degree", e.target.value)}
                  placeholder="E.g. +2 Science, Bachelor in CS"
                  required
                />
              </div>
              <div className="input-group">
                <label>Board / University</label>
                <input
                  type="text"
                  value={edu.board_university || ""}
                  onChange={(e) => handleEduChange(idx, "board_university", e.target.value)}
                  placeholder="E.g. NEB, Tribhuvan University"
                  required
                />
              </div>
              <div className="input-group">
                <label>GPA / Percentage</label>
                <input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) => handleEduChange(idx, "gpa", e.target.value)}
                  placeholder="E.g. 3.8 / 4.0 or 85%"
                />
              </div>
              <div className="input-group">
                <label>Graduation Year</label>
                <input
                  type="text"
                  value={edu.graduation_year || edu.year || ""}
                  onChange={(e) => handleEduChange(idx, "graduation_year", e.target.value)}
                  placeholder="E.g. 2024"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-entry-btn"
          onClick={addEducation}
        >
          <FaPlus /> Add Education
        </button>
      </div>
    </div>
  );
}

export default EducationSection;
