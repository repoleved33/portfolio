import React from "react";
import "./ExperienceItem.css";

function ExperienceItem({ role, company, location, period, description }) {
  return (
    <div className="experience-item">
      <p className="experience-role">{role}</p>
      <p className="experience-company">
        {company} | {location} | {period}
      </p>
      <p className="experience-description">{description}</p>
    </div>
  );
}

export default ExperienceItem;
