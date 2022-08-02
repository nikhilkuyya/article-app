import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout, authState } = useContext(AuthContext);
  const link = isAuthenticated ? "home" : "login";

  return (
    <header className="hf">
      <Link to={link}>
        <h1>Articles !</h1>
      </Link>
      {isAuthenticated ? (
        <>
          <span> {authState?.userInfo?.name?.toUpperCase()}</span>
          <button type="button" onClick={logout} className="logout">
            {" "}
            Logut
          </button>
        </>
      ) : (
        <ul className="hf nav-li">
          <li>
            <Link to="/login">Login</Link>{" "}
          </li>
          |
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
