import React from "react";
import "./About.css";
import profileImage from "../assets/profile.jpg";
import info from "../config/info";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  return (
    <div className="about-container">
      <div className="about-info">
        <h1 className="about-name">{info.name}</h1>
        <p className="about-description">
          Software Engineer with 4+ years of experience operating web
          applications. After focusing on personal growth and exploring my
          strengths, I'm now eager to relaunch my career in software
          development.
        </p>

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
      </div>
      <div className="about-profile">
        <img src={profileImage} alt="Profile" />
      </div>
    </div>
  );
}

export default About;
