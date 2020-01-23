import React from "react";
import Globe from "./globe";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Globe className="globe"></Globe>

      <div className="Info">
        Kol Crooks
        <div className="links">
          <div className="closerMouse">
            <a>Résumé</a>
          </div>
          <div className="closerMouse">
            <a>Projects</a>
          </div>
          <div className="closerMouse">
            <a>Github</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
