import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useSpring, animated } from "react-spring";

import Home from "./Home";
import Resume from "./Resume";
import Projects from "./Projects";
import "./App.scss";
import { useMediaQuery } from "react-responsive";
import { IoMenu } from "react-icons/io5";

function goToCorrectPage() {
  switch (window.location.href.split("/#/")[1]) {
    case "":
      document.querySelector(".Home")?.scrollIntoView({ block: "end" });
      break;
    case "resume":
      document.querySelector(".Resume")?.scrollIntoView({ block: "end" });
      break;
    case "projects":
      document.querySelector(".Projects")?.scrollIntoView({ block: "end" });
      break;
  }
}
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
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });

  // Setup page scrolling
  useEffect(() => {
    let visible = false;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        let [entry] = entries;
        if (entry.isIntersecting) {
          visible = true;
        } else {
          visible = false;
        }
      },
      { threshold: 1 }
    );

    const projectsEl = document.querySelector(".Projects");
    if (projectsEl) visibilityObserver.observe(projectsEl);

    document
      .querySelector(".router-contents")
      ?.addEventListener("mousewheel", (e) => {
        e.preventDefault();
      });
    document
      .querySelector(".projects-content")
      ?.addEventListener("mousewheel", (e) => {
        if (visible) e.stopPropagation();
      });
    goToCorrectPage();

    window.addEventListener("resize", () => {
      goToCorrectPage();
    });
  });

  // Setup the links section
  const links = (
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
  );
  const routerContents = (
    <Switch>
      <Route path="/resume" component={Container}></Route>
      <Route path="/projects" component={Container}></Route>
      <Route path="/" component={Container}></Route>
    </Switch>
  );
  return (
    <div className="App">
      <Router>
        <div className="router">
          <div className="router-sidebar">
            <div className="dot-container">
              <Dot />
            </div>
            {links}
          </div>
          <div className="router-contents">{routerContents}</div>
        </div>
      </Router>
    </div>
  );
}

export default App;
