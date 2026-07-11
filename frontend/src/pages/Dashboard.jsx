import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FaFileAlt,
  FaRobot,
  FaFileSignature,
  FaFolderOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_resumes: 0,
    avg_score: 0,
    total_reviews: 0,
    total_cover_letters: 0,
    recent_activity: []
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard/stats/");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>🤖 AI Resume Builder</h2>
        <div className="header-right">
          <div className="user-box">
            <FaUserCircle />
            <span>{username}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>

      <section className="welcome">
        <h1>Welcome Back 👋</h1>
        <p>Create, manage and review your resume using AI-powered tools.</p>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stats-card">
          <div className="stats-value">{stats.total_resumes}</div>
          <div className="stats-label">Total Resumes</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{stats.avg_score}%</div>
          <div className="stats-label">Avg. Review Score</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{stats.total_reviews}</div>
          <div className="stats-label">AI Reviews Run</div>
        </div>
        <div className="stats-card">
          <div className="stats-value">{stats.total_cover_letters}</div>
          <div className="stats-label">Cover Letters</div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <h2 className="grid-title">Quick Actions</h2>
      <section className="dashboard-grid">
        <Link to="/resume-form" className="dashboard-card">
          <FaFileAlt className="card-icon" />
          <h3>Resume Builder</h3>
          <p>Create a professional ATS-friendly resume.</p>
          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/review" className="dashboard-card">
          <FaRobot className="card-icon" />
          <h3>AI Resume Review</h3>
          <p>Review your resume and get AI suggestions.</p>
          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/cover-letter" className="dashboard-card">
          <FaFileSignature className="card-icon" />
          <h3>Cover Letter</h3>
          <p>Generate personalized cover letters using AI.</p>
          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/resume-list" className="dashboard-card">
          <FaFolderOpen className="card-icon" />
          <h3>My Resumes</h3>
          <p>View, edit and manage all your saved resumes.</p>
          <span>
            Open <FaArrowRight />
          </span>
        </Link>
      </section>

      {/* Activity Timeline */}
      <section className="activity">
        <h2>Recent Activity</h2>
        {loading ? (
          <p>Loading activity feed...</p>
        ) : stats.recent_activity && stats.recent_activity.length > 0 ? (
          <div className="activity-list">
            {stats.recent_activity.map((act, index) => (
              <div
                key={index}
                className="activity-item-card"
                onClick={() => {
                  if (act.type === "Resume") {
                    navigate(`/resume-view/${act.id}`);
                  } else if (act.type === "AI Review") {
                    navigate(`/review?resume_id=${act.id}`);
                  } else if (act.type === "Cover Letter") {
                    navigate(`/cover-letter`);
                  }
                }}
              >
                <div className="activity-header">
                  <span className={`activity-badge badge-${act.type.toLowerCase().replace(" ", "-")}`}>
                    {act.type}
                  </span>
                  <span className="activity-date">{act.date}</span>
                </div>
                <h3>{act.title}</h3>
                <p>{act.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <FaFolderOpen className="empty-icon" />
            <h3>No Resume Yet</h3>
            <p>Start by creating your first professional resume.</p>
            <Link to="/resume-form">
              <button className="start-btn">Create Resume</button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;