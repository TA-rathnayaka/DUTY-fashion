import React from "react";
import NavItem from "./NavItem";

function Navbar({ items }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
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
            <ul className="navbar-nav mx-auto">
              {items.map((item) => (
                <NavItem item={item} />
              ))}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
