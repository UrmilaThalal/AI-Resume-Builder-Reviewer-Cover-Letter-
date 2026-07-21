import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import api from "../api/axios";
import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      toast.error("Please fill all fields.");
      return;

    }

    if (formData.password !== formData.confirmPassword) {

      toast.error("Passwords do not match.");
      return;

    }

    try {

      setLoading(true);

      await api.post("register/", {

        full_name: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,

      });

      toast.success("Registration Successful!");

      navigate("/login");

    } catch (error) {

      if (error.response) {

        toast.error(typeof error.response.data === "object" ? JSON.stringify(error.response.data) : error.response.data);

      } else {

        toast.error("Server Error");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1><FaUserPlus /> AI Resume Builder</h1>

        <h2>Create Account</h2>

        <p>

          Register to start building AI-powered resumes.

        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          <div className="input-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
                placeholder="Create password"
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
                    <div className="input-group">

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="bottom-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;