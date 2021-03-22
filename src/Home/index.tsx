import React from "react";
import "react-typist/dist/Typist.css";
import "./Home.scss";
import Typist from "react-typist";
import GameOfLifeComponent from "./../GameOfLife";

function Home() {
  return (
    <div className="Home">
      <div className="TypingArea">
        <span className="Name">Kol Crooks</span>
        <div className="subHeader">
          <Typist
            className="iam"
            cursor={{ blink: true, element: "_" }}
            avgTypingDelay={10}
          >
            <span>Full Stack Developer</span>
          </Typist>
          <div />
          <div className="links">
            <div className="carrot-indicator">
              {"> "}
              <a className="link-text" href="https://github.com/KolCrooks">
                Github
              </a>
            </div>
            <div className="carrot-indicator">
              {"> "}
              <a className="link-text" href="https://linkedin.com/in/kolcrooks">
                {" "}
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="game-of-life">
        <GameOfLifeComponent />
      </div>
    </div>
  );
}

export default Home;
