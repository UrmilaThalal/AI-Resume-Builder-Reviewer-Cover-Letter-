import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiCpuChip } from "react-icons/hi2";
import toast from "react-hot-toast";
import api from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    username: "",
    password: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !formData.username ||

      !formData.password

    ) {

      toast.error("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      const response = await api.post("login/", {

        username: formData.username,

        password: formData.password,

      });

      localStorage.setItem(

        "access",

        response.data.access

      );

      localStorage.setItem(

        "refresh",

        response.data.refresh

      );
      localStorage.setItem("username", formData.username);

      navigate("/dashboard");

    } catch (error) {

      if (error.response) {

        toast.error("Invalid username or password.");

      } else {

        toast.error("Server error. Please try again later.");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1><HiCpuChip className="brand-icon" /> AI Resume Builder</h1>

        <h2>Welcome Back</h2>

        <p>

          Login to continue building your AI-powered resume.

        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Username</label>

            <input

              type="text"

              name="username"

              value={formData.username}

              onChange={handleChange}

              placeholder="Enter username"

              required

            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input

                type={showPassword ? "text" : "password"}

                name="password"

                value={formData.password}

                onChange={handleChange}

                placeholder="Enter password"

                required

              />

              <span

                className="eye-icon"

                onClick={() => setShowPassword(!showPassword)}

              >

                {showPassword ? <FaEyeSlash /> : <FaEye />}

              </span>

            </div>

          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="bottom-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;