import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Home from "./Home";
import Resume from "./Resume";
import Projects from "./Projects";
import "./App.scss";

function Dot() {
  const location = useLocation();
  let pos = 0;
  const positions = 3;
  switch (location.pathname) {
    case "/":
      pos = 0;
      break;
    case "/resume":
      pos = 1;
      break;
    case "/projects":
      pos = 2;
      break;
  }
  const dotAnimation = useSpring({
    transform: `translateY(calc(100vh * ${pos} / ${positions} + (100vh / (2 * ${positions})) - 0.7rem))`,
  });
  return (
    <>{<animated.div className="dot" style={dotAnimation}></animated.div>}</>
  );
}

function Container() {
  return (
    <>
      <Home />
      <Resume />
      <Projects />
    </>
  );
}

function App() {
  useEffect(() => {
    document
      .querySelector(".router-contents")
      ?.addEventListener("mousewheel", (e) => {
        e.preventDefault();
      });
  });
  return (
    <div className="App">
      <Router>
        <div className="router">
          <div className="router-sidebar">
            <div className="dot-container">
              <Dot />
            </div>
            <div className="links">
              <Link
                to={"/"}
                className="Home-Link"
                onClick={() =>
                  document
                    .querySelector(".Home")
                    ?.scrollIntoView({ behavior: "smooth", block: "end" })
                }
              >
                Home
              </Link>
              <Link
                to={"/resume"}
                className="Resume-Link"
                onClick={() =>
                  document
                    .querySelector(".Resume")
                    ?.scrollIntoView({ behavior: "smooth", block: "end" })
                }
              >
                Resume
              </Link>
              <Link
                to={"/projects"}
                className="Project-Link"
                onClick={() =>
                  document
                    .querySelector(".Projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "end" })
                }
              >
                Projects
              </Link>
            </div>
          </div>
          <div className="router-contents">
            <Switch>
              <Route
                path="/resume"
                component={Container}
                onEnter={() =>
                  document.querySelector(".Resume")?.scrollIntoView()
                }
              ></Route>
              <Route
                path="/projects"
                component={Container}
                onEnter={() =>
                  document.querySelector(".Projects")?.scrollIntoView()
                }
              ></Route>
              <Route
                path="/"
                component={Container}
                onEnter={() =>
                  document.querySelector(".Home")?.scrollIntoView()
                }
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
