import React from "react";
import "./SkillsItem.css";

function SkillsItem({ category, items }) {
  return (
    <div className="skill-category">
      <h3 className="skill-category-title">{category}</h3>
      <div className="skill-items">
        {items.map((item, idx) => (
          <span key={idx} className="skill-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsItem;
