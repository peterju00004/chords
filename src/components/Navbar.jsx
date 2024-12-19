import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <h1 className="logo">Chords</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/devices">Devices</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;