import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        AI Resume Builder
      </div>

      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>
      </ul>

      <div className="nav-buttons">

        <Link to="/login" className="nav-login-btn">
          Login
        </Link>

        <Link to="/register" className="nav-register-btn">
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;