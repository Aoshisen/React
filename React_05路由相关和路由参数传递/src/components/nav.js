// 用NavLink重写Link

import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <ul>
      <li>
        <NavLink
          to="/"
          activeStyle={{
            color: "red",
          }}
          isActive={() => {
            return true;
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          activeStyle={{
            color: "red",
          }}
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user"
          activeStyle={{
            color: "red",
          }}
        >
          User
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/message"
          activeStyle={{
            color: "red",
          }}
        >
          {" "}
          Message
        </NavLink>
      </li>
    </ul>
  );
}
