import React, { useState } from "react";
import "react-typist/dist/Typist.css";
import "./Home.scss";
import Typist from "react-typist";
import { Fade } from "react-awesome-reveal";

function App() {
  const [iamText, setIamText] = useState(false);
  const [links, setLinks] = useState(false);
  return (
    <div className="App">
      <div className="TypingArea">
        <Typist
          className="Name"
          cursor={{
            element: "_",
            hideWhenDone: true,
            hideWhenDoneDelay: 0,
          }}
          avgTypingDelay={100}
          onTypingDone={() => setIamText(true)}
        >
          <span>Kol Crooks</span>
          <Typist.Delay ms={500} />
        </Typist>
        <div className="subHeader">
          {iamText ? (
            <Typist
              className="iam"
              cursor={{ blink: true, element: "_" }}
              avgTypingDelay={50}
              onTypingDone={() => setLinks(true)}
            >
              <span>Front End Developer</span>
              <Typist.Backspace
                count={"Front End Developer".length}
                delay={200}
              />
              <span>Back End Developer</span>
              <Typist.Backspace
                count={"Back End Developer".length}
                delay={200}
              />
              <span>Full Stack Developer</span>
            </Typist>
          ) : (
            <div />
          )}
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
    </div>
  );
}

export default App;
