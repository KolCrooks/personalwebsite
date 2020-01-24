import React from "react";
import Globe from "../components/globe";

import "./main.css";
import { Link } from "react-router-dom";

const Main: React.FC<{}> = () => {
  return (
    <div className="mainPage">
      <Globe className="globe"></Globe>

      <div className="Info">
        Kol Crooks
        <div className="links">
          <div className="closerMouse">
            <Link to="/resume">Resume</Link>
          </div>
          <div className="closerMouse">
            <Link to="/projects">Projects</Link>
          </div>
          <div className="closerMouse">
            <a href="https://github.com/KolCrooks">Github</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
