import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to="/message">Message</Link>
      </li>
    </ul>
  );
}
