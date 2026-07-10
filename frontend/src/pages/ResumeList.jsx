import "./ResumeList.css";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaPlus,
  FaClock
} from "react-icons/fa";

function ResumeList() {
  return (
    <div className="resume-list-page">

      <div className="resume-list-container">

        {/* Header */}

        <div className="page-header">

          <div>

            <h1>My Resumes</h1>

            <p>
              View, edit and manage all your saved resumes.
            </p>

          </div>

          <Link
            to="/resume-form"
            className="create-btn"
          >

            <FaPlus />

            Create Resume

          </Link>

        </div>

        {/* Resume Card 1 */}

        <div className="resume-card">

          <div className="resume-left">

            <FaFileAlt className="resume-icon"/>

            <div>

              <h3>Software Engineer Resume</h3>

              <p>

                <FaClock />

                Last Updated : Today

              </p>

            </div>

          </div>

          <div className="resume-right">

            <button className="view-btn">

              <FaEye />

              View

            </button>

            <button className="edit-btn">

              <FaEdit />

              Edit

            </button>

            <button className="pdf-btn">

              <FaDownload />

              PDF

            </button>

            <button className="delete-btn">

              <FaTrash />

              Delete

            </button>

          </div>

        </div>

        {/* Resume Card 2 */}

        <div className="resume-card">

          <div className="resume-left">

            <FaFileAlt className="resume-icon"/>

            <div>

              <h3>Frontend Developer Resume</h3>

              <p>

                <FaClock />

                Last Updated : Yesterday

              </p>

            </div>

          </div>

          <div className="resume-right">

            <button className="view-btn">

              <FaEye />

              View

            </button>

            <button className="edit-btn">

              <FaEdit />

              Edit

            </button>

            <button className="pdf-btn">

              <FaDownload />

              PDF

            </button>

            <button className="delete-btn">

              <FaTrash />

              Delete

            </button>

          </div>

        </div>

        {/* Empty State */}

        <div className="empty-state">

          <FaFileAlt className="empty-icon"/>

          <h2>No More Resumes</h2>

          <p>

            Create a new resume to manage it here.

          </p>

          <Link
            to="/resume-form"
            className="empty-btn"
          >

            <FaPlus />

            Create Resume

          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResumeList;