import React from "react";
import NavItem from "../NavItem";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faUserPlus,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ items, logged, isAdmin }) {
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
            {items.map((item, index) => {
              if (typeof item === "string") {
                // If item is a string, treat it as a text link
                return (
                  <NavItem
                    key={index}
                    item={{ name: item, path: `/${item.toLowerCase()}` }}
                  />
                );
              } else if (item.icon && item.path) {
                // If item is an object with icon and path
                return (
                  <li className="nav-item" key={index}>
                    <Link
                      className="nav-link"
                      to={item.path}
                      title={item.icon.label}
                    >
                      <FontAwesomeIcon icon={item.icon.icon} />
                    </Link>
                  </li>
                );
              }
              return null; // Fallback in case item structure is incorrect
            })}
          </ul>
          <ul className="navbar-nav ms-lg-auto">
            {logged ? (
              <>
                {/* Show Cart icon if user is logged in */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/cart"
                    title="Cart"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Link>
                </li>
                {/* Show Admin Panel icon if user is an admin */}
                {isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/admin"
                      title="Admin Panel"
                    >
                      <FontAwesomeIcon icon={faTachometerAlt} />
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/login"
                    title="Login"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/signup"
                    title="Sign up"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
