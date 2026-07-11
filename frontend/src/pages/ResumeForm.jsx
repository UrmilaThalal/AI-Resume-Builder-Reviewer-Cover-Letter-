import "./ResumeForm.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    certifications: "",
  });

  useEffect(() => {
    if (id) {
      fetchResumeDetails();
    }
  }, [id]);

  const fetchResumeDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`resume/${id}/`);
      setFormData({
        full_name: response.data.full_name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        address: response.data.address || "",
        linkedin: response.data.linkedin || "",
        github: response.data.github || "",
        summary: response.data.summary || "",
        education: response.data.education || "",
        experience: response.data.experience || "",
        skills: response.data.skills || "",
        projects: response.data.projects || "",
        certifications: response.data.certifications || "",
      });
    } catch (error) {
      console.error("Error fetching resume details:", error);
      alert("Error loading resume details.");
      navigate("/resume-list");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (id) {
        // Edit flow
        await api.put(`resume/${id}/`, formData);
        alert("Resume Updated Successfully!");
        navigate("/resume-list");
      } else {
        // Create flow
        await api.post("resume/", formData);
        alert("Resume Saved Successfully!");
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          github: "",
          summary: "",
          education: "",
          experience: "",
          skills: "",
          projects: "",
          certifications: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Unable to save resume.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="resume-page">

      <div className="resume-container">

        <h1>Resume Builder</h1>

        <p className="subtitle">
          Fill in your details to create a professional resume.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="section">

            <h2>Personal Information</h2>

            <div className="form-grid">

              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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

                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

              </div>

              <div className="input-group">

                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />

              </div>

              <div className="input-group">

                <label>LinkedIn Profile</label>

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn profile"
                />

              </div>

              <div className="input-group">

                <label>GitHub Profile</label>

                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="Enter GitHub profile"
                />

              </div>

            </div>

          </div>
                    {/* ================= Professional Summary ================= */}

          <div className="section">

            <h2>Professional Summary</h2>

            <textarea
              rows="5"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a short summary about yourself..."
              required
            ></textarea>

          </div>

          {/* ================= Education ================= */}

          <div className="section">

            <h2>Education</h2>

            <textarea
              rows="5"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder=" "
              required
            ></textarea>

          </div>

          {/* ================= Skills ================= */}

          <div className="section">

            <h2>Skills</h2>

            <textarea
              rows="5"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder=" "
              required
            ></textarea>

          </div>

          {/* ================= Projects ================= */}

          <div className="section">

            <h2>Projects</h2>

            <textarea
              rows="5"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              placeholder="Describe your academic or personal projects..."
            ></textarea>

          </div>

          {/* ================= Work Experience ================= */}

          <div className="section">

            <h2>

              Work Experience

              <span className="optional"> (Optional)</span>

            </h2>

            <textarea
              rows="5"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder=" "
            ></textarea>

          </div>
                    {/* ================= Certifications ================= */}

          <div className="section">

            <h2>

              Certifications

              <span className="optional"> (Optional)</span>

            </h2>

            <textarea
              rows="4"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="AWS Cloud Practitioner, Google Data Analytics..."
            ></textarea>

          </div>

          {/* ================= Confirmation ================= */}

          <div className="checkbox-area">

            <input
              type="checkbox"
              id="confirm"
              required
            />

            <label htmlFor="confirm">
              I confirm that all the information provided is correct.
            </label>

          </div>

          {/* ================= Button ================= */}

          <div className="button-area">

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {loading ? "Saving..." : "Save Resume"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ResumeForm;