import "./ResumeForm.css";

function ResumeForm() {
  return (
    <div className="resume-page">

      <div className="resume-container">

        <h1>Resume Builder</h1>

        <p className="subtitle">
          Fill in your details to create a professional resume.
        </p>

        {/* ================= Personal Information ================= */}

        <div className="section">

          <h2>Personal Information</h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter your address"
              />
            </div>

            <div className="input-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                placeholder="Enter your LinkedIn profile link"
              />
            </div>

            <div className="input-group">
              <label>GitHub Profile</label>
              <input
                type="url"
                placeholder="Enter your GitHub profile link"
              />
            </div>

          </div>

        </div>

        {/* ================= Professional Summary ================= */}

        <div className="section">

          <h2>Professional Summary</h2>

          <textarea
            rows="5"
            placeholder="Write a short summary about yourself..."
          ></textarea>

        </div>

        {/* ================= Education ================= */}

        <div className="section">

          <h2>Education</h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Degree</label>
              <input
                type="text"
                placeholder="Enter your degree"
              />
            </div>

            <div className="input-group">
              <label>College / University</label>
              <input
                type="text"
                placeholder="Enter your college or university"
              />
            </div>

            <div className="input-group">
              <label>Graduation Year</label>
              <input
                type="text"
                placeholder="Enter graduation year"
              />
            </div>

            <div className="input-group">
              <label>GPA (Optional)</label>
              <input
                type="text"
                placeholder="Enter GPA"
              />
            </div>

          </div>

        </div>

        {/* ================= Skills ================= */}

        <div className="section">

          <h2>Skills</h2>

          <textarea
            rows="4"
            placeholder="Enter your technical and soft skills..."
          ></textarea>

        </div>

        {/* ================= Projects ================= */}

        <div className="section">

          <h2>Projects</h2>

          <textarea
            rows="4"
            placeholder="Describe your academic or personal projects..."
          ></textarea>

        </div>

        {/* ================= Work Experience ================= */}

        <div className="section">

          <h2>
            Work Experience
            <span className="optional"> (Optional)</span>
          </h2>

          <div className="form-grid">

            <div className="input-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
              />
            </div>

            <div className="input-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter job title"
              />
            </div>

            <div className="input-group">
              <label>Duration</label>
              <input
                type="text"
                placeholder="Example: Jan 2024 - Dec 2024"
              />
            </div>

          </div>

          <div className="input-group">

            <label>Responsibilities</label>

            <textarea
              rows="4"
              placeholder="Describe your responsibilities..."
            ></textarea>

          </div>

        </div>

        {/* ================= Certifications ================= */}

        <div className="section">

          <h2>
            Certifications
            <span className="optional"> (Optional)</span>
          </h2>

          <textarea
            rows="4"
            placeholder="Enter your certifications..."
          ></textarea>

        </div>

        {/* ================= Checkbox ================= */}

        <div className="checkbox-area">

          <input
            type="checkbox"
            id="confirm"
          />

          <label htmlFor="confirm">
            I confirm that all the information provided is correct.
          </label>

        </div>

        {/* ================= Button ================= */}

        <div className="button-area">

          <button className="save-btn">

            Save Resume

          </button>

        </div>

      </div>

    </div>
  );
}

export default ResumeForm;