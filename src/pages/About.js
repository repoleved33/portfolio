import React from "react";

import ExperienceItem from "../components/ExperienceItem";

import "./About.css";
import profileImage from "../assets/profile.jpg";
import info from "../config/info";
import experience from "../config/experience";

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
          <p className="about-description">
            Software Engineer with 4+ years of experience operating web
            applications. After focusing on personal growth and exploring my
            strengths, I'm now eager to relaunch my career in software
            development.
          </p>
        </div>
      </div>
      <div className="about-experience">
        <h2>Experience</h2>
        {experience.experiences.map((exp, idx) => (
          <ExperienceItem key={idx} {...exp} />
        ))}
      </div>
    </div>
  );
}

export default About;
