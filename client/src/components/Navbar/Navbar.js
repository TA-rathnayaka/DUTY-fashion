import React from "react";
import NavItem from "../NavItem";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

function Navbar({ items, logged }) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" aria-current="page" to="/">
          DUTY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {items.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
          <ul className="navbar-nav ms-lg-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/login">
                {logged || "Login"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/signup">
                {logged || "Sign up"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
