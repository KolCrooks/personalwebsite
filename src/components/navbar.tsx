import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

interface PageRoute {
  to: string;
  name: string;
}

let pages: PageRoute[] = [
  { to: "/", name: "Home" },
  { to: "/resume", name: "Resumé" },
  { to: "/projects", name: "Projects" }
];

const NavBar: React.FC = () => {
  return (
    <div className="navbarContainer">
      {pages.map(p => (
        <Link to={p.to} key={p.to}>
          {p.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
