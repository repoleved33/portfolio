import React from "react";
import projectsData from "../config/projectsData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

function Projects() {
  return (
    <div className="projects-container">
      <h2 className="projects-header">Personal Projects</h2>
      <div className="projects-grid">
        {projectsData.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
            <div className="project-details">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <FaGithub />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              <p className="project-period">{project.period}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
