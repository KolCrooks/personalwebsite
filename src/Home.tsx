import React, { useState } from "react";
import "react-typist/dist/Typist.css";
import "./Home.scss";
import Typist from "react-typist";
import { Fade } from "react-awesome-reveal";
import GameOfLifeComponent from "./GameOfLife";

function Home() {
  const [links, setLinks] = useState(false);
  return (
    <div className="Home">
      <div className="TypingArea">
        <span className="Name">Kol Crooks</span>
        <div className="subHeader">
          <Typist
            className="iam"
            cursor={{ blink: true, element: "_" }}
            avgTypingDelay={10}
            onTypingDone={() => setLinks(true)}
          >
            <span>Full Stack Developer</span>
          </Typist>
          <div />
          {links ? (
            <Fade cascade className="links">
              <span className="carrot-indicator">
                {"> "}{" "}
                <a className="link-text" href="https://github.com/KolCrooks">
                  Github{" "}
                </a>
              </span>
              <span className="carrot-indicator">
                {"> "}{" "}
                <a
                  className="link-text"
                  href="https://linkedin.com/in/kolcrooks"
                >
                  {" "}
                  LinkedIn{" "}
                </a>
              </span>
            </Fade>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div style={{ margin: "auto", width: "50%", height: "50%" }}>
        <GameOfLifeComponent />
      </div>
    </div>
  );
}

export default Home;
