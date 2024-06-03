import React from "react";

function NavItem({ item }) {
  return (
    <>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">
          {item}
        </a>
      </li>
    </>
  );
}

export default NavItem;
