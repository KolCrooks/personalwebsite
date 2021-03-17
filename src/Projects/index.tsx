import React, { useState } from "react";
import "react-typist/dist/Typist.css";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";
import projectFiles from "./project-files";
import { ProjectTagElement, ProjectTags } from "./project-files/ProjectTags";

import { IoFilter } from "react-icons/io5";

function Projects() {
  const [filters, setFilters] = useState<Record<string, boolean>>(
    Object.values(ProjectTags).reduce((obj, v) => {
      if (projectFiles.find((f) => f.tags?.find((t) => t === v)))
        return Object.assign(obj, { [v]: true });
      return obj;
    }, {} as Record<ProjectTags, boolean>)
  );

  const cards = [];
  for (const file of projectFiles) {
    if (file.tags?.find((t) => filters[t]))
      cards.push(<ProjectCard {...file} />);
  }
  const tags = [];
  for (const val in filters) {
    tags.push(
      <div
        className={"filter" + (filters[val] ? " active" : "")}
        onClick={() =>
          setFilters((v) => {
            const temp = Object.assign({}, v);
            temp[val] = !v[val];
            return temp;
          })
        }
      >
        <div className="filter-text">{val}</div>{" "}
        {<ProjectTagElement tag={val as ProjectTags} />}
      </div>
    );
  }

  const filteringAll = Object.values(filters).every((t) => t);
  const filteringNone = Object.values(filters).every((t) => !t);

  return (
    <div className="Projects">
      <div className="project-tag-filters">
        <div className="project-filter-header">
          <IoFilter />
          <div
            className={"filter-all" + (filteringAll ? " active" : "")}
            onClick={() => {
              setFilters((v) => {
                const temp = Object.assign({}, v);
                if (filteringAll) for (const i in temp) temp[i] = false;
                else for (const i in temp) temp[i] = true;
                return temp;
              });
            }}
          >
            All
          </div>
          <div
            className={"filter-none" + (filteringNone ? " active" : "")}
            onClick={() => {
              setFilters((v) => {
                const temp = Object.assign({}, v);
                if (filteringNone) for (const i in temp) temp[i] = true;
                else for (const i in temp) temp[i] = false;
                return temp;
              });
            }}
          >
            None
          </div>
        </div>
        <div className="project-filter-section">{tags}</div>
      </div>
      <div className="projects-content">{cards}</div>
    </div>
  );
}

export default Projects;
