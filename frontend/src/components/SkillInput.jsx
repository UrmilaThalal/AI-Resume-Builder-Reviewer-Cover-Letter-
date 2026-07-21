import React, { useState } from "react";
import { FaTag } from "react-icons/fa";
import "./SkillInput.css";

function SkillInput({ skillTags, setSkillTags }) {
  const [skillInput, setSkillInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = skillInput.trim().replace(/,$/, "");
      if (val && !skillTags.includes(val)) {
        setSkillTags([...skillTags, val]);
      }
      setSkillInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setSkillTags(skillTags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="skills-tag-input-container">
      <div className="skills-tags-list">
        {skillTags.map((tag, index) => (
          <span key={index} className="skill-tag-badge">
            {tag}
            <button
              type="button"
              className="remove-tag-btn"
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="tag-input-wrapper">
        <FaTag className="tag-icon" />
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter or Comma (e.g. React)"
        />
      </div>
    </div>
  );
}

export default SkillInput;
