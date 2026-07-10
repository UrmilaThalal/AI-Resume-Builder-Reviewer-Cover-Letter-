import "./Dashboard.css";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaRobot,
  FaFileSignature,
  FaFolderOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowRight
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}

      <header className="dashboard-header">

        <h2>AI Resume Builder</h2>

        <div className="header-right">

          <div className="user-box">
            <FaUserCircle />
            <span>Urmila</span>
          </div>

          <button className="logout-btn">
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </header>

      {/* Welcome */}

      <section className="welcome">

        <h1>Welcome Back 👋</h1>

        <p>
          Create, manage and review your resume using AI-powered tools.
        </p>

      </section>

      {/* Feature Cards */}

      <section className="dashboard-grid">

        <Link to="/resume-form" className="dashboard-card">

          <FaFileAlt className="card-icon"/>

          <h3>Resume Builder</h3>

          <p>
            Create a professional ATS-friendly resume.
          </p>

          <span>
            Open <FaArrowRight />
          </span>

        </Link>

        <Link to="/review" className="dashboard-card">

          <FaRobot className="card-icon"/>

          <h3>AI Resume Review</h3>

          <p>
            Review your resume and get AI suggestions.
          </p>

          <span>
            Open <FaArrowRight />
          </span>

        </Link>

        <Link to="/cover-letter" className="dashboard-card">

          <FaFileSignature className="card-icon"/>

          <h3>Cover Letter</h3>

          <p>
            Generate personalized cover letters.
          </p>

          <span>
            Open <FaArrowRight />
          </span>

        </Link>

        <Link to="/resume-list" className="dashboard-card">

          <FaFolderOpen className="card-icon"/>

          <h3>My Resumes</h3>

          <p>
            View and manage all saved resumes.
          </p>

          <span>
            Open <FaArrowRight />
          </span>

        </Link>

      </section>

      {/* Recent Activity */}

      <section className="activity">

        <h2>Recent Activity</h2>

        <div className="empty-box">

          <FaFolderOpen className="empty-icon"/>

          <h3>No Resume Yet</h3>

          <p>
            Start by creating your first resume.
          </p>

          <Link to="/resume-form">

            <button className="start-btn">

              Create Resume

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;