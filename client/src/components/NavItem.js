import React from "react";
import { Link } from "react-router-dom";

function NavItem({ item }) {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to={item.route}>
          {item.name}
        </Link>
      </li>
    </>
  );
}

export default NavItem;
