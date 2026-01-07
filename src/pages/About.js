import React from "react";

import ExperienceItem from "../components/ExperienceItem";
import SkillsItem from "../components/SkillsItem";

import "./About.css";
import profileImage from "../assets/profile.jpg";
import info from "../config/info";
import experienceData from "../config/experienceData";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function About() {
  return (
    <div className="about-container">
      <div className="about-info">
        {/* col 1 */}
        <div className="about-profile">
          <img src={profileImage} alt="Profile" />
        </div>
        {/* col 2 */}
        <div className="about-content">
          <div className="about-title">
            <h1 className="about-name">{info.name}</h1>
            <div className="about-role-wrapper">
              <p className="about-role">Software Engineer</p>
              <span className="about-location">
                <FaMapMarkerAlt />
                <span> London, UK</span>
              </span>
            </div>
          </div>
          <div className="about-contacts">
            <a href={`mailto:${info.email}`} target="_blank" rel="noreferrer">
              <FaEnvelope />
            </a>
            <a href={info.github} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href={info.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
          <p className="about-description">{info.description}</p>
        </div>
      </div>
      <div className="about-experience">
        <h2>Experience</h2>
        {experienceData.experiences.map((exp, idx) => (
          <ExperienceItem key={idx} {...exp} />
        ))}
      </div>
      <div className="about-skills">
        <h2>Skills</h2>
        {experienceData.skills.map((skillCate, idx) => (
          <SkillsItem
            key={idx}
            category={skillCate.category}
            items={skillCate.items}
          />
        ))}
      </div>
    </div>
  );
}

export default About;
