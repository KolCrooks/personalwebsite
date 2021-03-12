import React from "react";
import "react-typist/dist/Typist.css";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";
import projectFiles from "./project-files";
import { useLocation } from "react-router-dom";

function Projects() {
  const cards = [];
  for (const file of projectFiles) {
    cards.push(<ProjectCard {...file} />);
  }

  return (
    <div className="Projects">
      <div className="projects-content">{cards}</div>
    </div>
  );
}

export default Projects;
