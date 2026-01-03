import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>Welcome!</h2>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
