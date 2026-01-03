import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // 스타일용

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>Guuchive</h2>
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
