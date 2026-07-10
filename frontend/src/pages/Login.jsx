import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">

      <div className="login-card">

        <h1>🤖 AI Resume Builder</h1>

        <h2>Welcome Back 👋</h2>

        <p>
          Login to continue your AI Resume Builder journey.
        </p>

        <form>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />

          </div>

          <button className="login-submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;