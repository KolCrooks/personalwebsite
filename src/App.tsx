import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Main from "./pages/main";
import Resume from "./pages/resume/resume";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <TransitionGroup className="transition-group">
          <CSSTransition timeout={{ exit: 300 }} classNames={"fade"}>
            <Switch>
              <Route path="/resume">
                <Resume />
              </Route>
              <Route path="/projects"></Route>
              <Route path="/" exact>
                <Main />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Router>
    </div>
  );
};

export default App;
