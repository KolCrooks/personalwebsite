import React from "react";
import "react-typist/dist/Typist.css";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";
import projectFiles from "./project-files";

function Projects() {
  const cards = [];
  for (const file of projectFiles) {
    cards.push(
      <ProjectCard
        title={file.title}
        imageURL={file.image}
        markdown={file.markdown}
        key={file.title}
      />
    );
  }

  return (
    <div className="Projects">
      <div className="projects-content">{cards}</div>
    </div>
  );
}

export default Projects;
