import { NavLink } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

// styles
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.title}>
          <NavLink to="/">myMoney</NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
