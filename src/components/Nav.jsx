import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home/zitoun">zitoun</NavLink>
        </li>
        <li>
          <NavLink to="/home/kook">kook</NavLink>
        </li>
        <li>
          <NavLink to="/home/lim">lim</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
