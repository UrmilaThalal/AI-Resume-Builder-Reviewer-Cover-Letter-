import "./ResumeForm.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { 
  FaArrowLeft, 
  FaUser, 
  FaFileAlt, 
  FaGraduationCap, 
  FaBriefcase, 
  FaCode, 
  FaCertificate, 
  FaChevronDown, 
  FaChevronUp,
  FaCheck,
  FaPlus,
  FaTrash
} from "react-icons/fa";

// Subcomponents
import ResumeTemplates from "../components/ResumeTemplates";
import SkillInput from "../components/SkillInput";
import ResumePreview from "../components/ResumePreview";

const templateSampleData = {
  "Modern Professional": {
    summary: "Results-driven Professional with over 5 years of experience in project coordination and operations. Adept at driving process improvements, managing cross-functional teams, and executing strategic initiatives to enhance business efficiency.",
    skills: "Project Management, Operations Management, Process Improvement, Business Strategy, Vendor Relations, Budgeting",
    education: [
      { school_college: "State University", degree: "Bachelor of Business Administration", board_university: "State Board", gpa: "3.7", graduation_year: "2020" }
    ],
    experience: [
      { company: "Acme Corporation", role: "Operations Coordinator", start_date: "2021", end_date: "", currently_working: true, description: "- Managed regional project rollouts, improving timeline delivery by 15%.\n- Streamlined vendor onboarding processes, saving 10+ hours per week of manual administration." }
    ],
    projects: [
      { title: "Strategic Expansion Project", technologies: "Excel, Tableau", link: "", demo_link: "", description: "- Coordinated research and planning phases for expanding services into 3 new regional territories." }
    ],
    certifications: [
      { name: "Certified Associate in Project Management (CAPM)", issuer: "Project Management Institute (PMI)", year: "2021", credential_id: "CAPM-9912", credential_url: "" }
    ]
  },
  "Software Engineer": {
    summary: "Passionate and detail-oriented Software Engineer with experience building scalable web applications. Skilled in modern frontend frameworks, backend API architectures, and cloud-native solutions.",
    skills: "React, Node.js, Python, JavaScript, Django, PostgreSQL, Git, Docker, REST APIs",
    education: [
      { school_college: "Tech Institute of Technology", degree: "Bachelor of Science in Computer Science", board_university: "TU", gpa: "3.8", graduation_year: "2021" }
    ],
    experience: [
      { company: "TechInnovate Solutions", role: "Software Developer", start_date: "2021", end_date: "", currently_working: true, description: "- Developed and maintained responsive React web apps, increasing user engagement by 20%.\n- Designed and implemented RESTful APIs using Django REST Framework." }
    ],
    projects: [
      { title: "E-Commerce Microservices Platform", technologies: "React, Docker, PostgreSQL", link: "https://github.com/developer/ecommerce", demo_link: "", description: "- Refactored legacy monolithic backend into scalable microservices." }
    ],
    certifications: [
      { name: "AWS Certified Developer - Associate", issuer: "Amazon Web Services", year: "2022", credential_id: "AWS-DEV-991", credential_url: "" }
    ]
  },
  "Data Analyst": {
    summary: "Analytical and detail-focused Data Analyst skilled in translating raw datasets into actionable commercial recommendations. Expert in designing interactive dashboards and performing statistical evaluations.",
    skills: "Python, SQL, Tableau, PowerBI, Excel, Pandas, NumPy, Data Cleaning",
    education: [
      { school_college: "Global Analytics University", degree: "Master of Science in Data Analytics", board_university: "GU", gpa: "3.9", graduation_year: "2022" }
    ],
    experience: [
      { company: "DataCorp International", role: "Data Analyst", start_date: "2022", end_date: "", currently_working: true, description: "- Created automated Tableau dashboard suites for C-level executives, reducing reporting turnarounds by 4 days." }
    ],
    projects: [
      { title: "Customer Retention Analysis", technologies: "Python, Pandas, Scikit-Learn", link: "", demo_link: "", description: "- Built python predictive model to flag churn patterns." }
    ],
    certifications: [
      { name: "Google Data Analytics Certificate", issuer: "Google Career Certificates", year: "2022", credential_id: "", credential_url: "" }
    ]
  },
  "Graphic Designer": {
    summary: "Creative Graphic Designer with 4+ years of expertise in visual identity, digital layouts, and UI concepts. Dedicated to producing high-impact visual content that aligns with brand strategies.",
    skills: "Photoshop, Illustrator, InDesign, Figma, UI/UX, Typography, Brand Identity",
    education: [
      { school_college: "National Academy of Fine Arts", degree: "Bachelor of Fine Arts in Graphic Design", board_university: "NAFA", gpa: "3.6", graduation_year: "2019" }
    ],
    experience: [
      { company: "Creative Spark Agency", role: "Lead Graphic Designer", start_date: "2020", end_date: "", currently_working: true, description: "- Created complete visual branding guidelines for 15+ corporate clients.\n- Developed UI mockups and prototypes in Figma." }
    ],
    projects: [
      { title: "Rebranding for EcoGreen Corp", technologies: "Photoshop, Illustrator", link: "", demo_link: "", description: "- Redesigned logo, marketing brochures, and website assets." }
    ],
    certifications: [
      { name: "Adobe Certified Professional", issuer: "Adobe", year: "2020", credential_id: "ADOBE-9912", credential_url: "" }
    ]
  },
  "Minimal ATS": {
    summary: "Dedicated Professional with a track record of driving operational efficiency and project coordination. Adept at cross-functional communication, process improvement, and documentation.",
    skills: "Microsoft Office, Project Coordination, Document Control, Customer Service, Written Communication",
    education: [
      { school_college: "Metropolitan Business School", degree: "Bachelor of Science in Management", board_university: "MBS", gpa: "3.5", graduation_year: "2018" }
    ],
    experience: [
      { company: "Acme Consulting", role: "Operations Administrator", start_date: "2019", end_date: "2022", currently_working: false, description: "- Structured standard operational procedures that optimized project onboarding speed." }
    ],
    projects: [
      { title: "Standard Operations Guide", technologies: "Microsoft Word, Visio", link: "", demo_link: "", description: "- Drafted standard layout operating guide that minimized department onboarding errors." }
    ],
    certifications: [
      { name: "Certified Document Specialist", issuer: "CDA", year: "2019", credential_id: "CDS-9921", credential_url: "" }
    ]
  }
};

function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    summary: "",
    template: "Modern Professional",
  });

  // Dynamic Lists State
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);

  // Skills Tags State
  const [skillTags, setSkillTags] = useState([]);

  // Inline Validation State
  const [formErrors, setFormErrors] = useState({});

  // Accordion Toggles (Only one open at a time)
  const [activeSection, setActiveSection] = useState("personal");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    if (id) {
      fetchResumeDetails();
    }
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateParam = searchParams.get("template");
    
    if (!id && templateParam && templateSampleData[templateParam]) {
      applyTemplateSample(templateParam);
    }
  }, [id]);

  useEffect(() => {
    const adjustHeight = (el) => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      adjustHeight(textarea);
      const handler = (e) => adjustHeight(e.target);
      textarea.addEventListener("input", handler);
      textarea._cleanupHandler = handler;
    });

    return () => {
      textareas.forEach((textarea) => {
        if (textarea._cleanupHandler) {
          textarea.removeEventListener("input", textarea._cleanupHandler);
        }
      });
    };
  }, [activeSection, educationList, experienceList, projectList, certificationList, formData.summary]);

  const applyTemplateSample = (tplName) => {
    const sample = templateSampleData[tplName];
    setFormData({
      full_name: "John Doe",
      email: "johndoe@domain.com",
      phone: "+1 555-0199",
      address: "New York, USA",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      summary: sample.summary,
      template: tplName
    });
    setEducationList(sample.education);
    setSkillTags(sample.skills.split(",").map(t => t.trim()).filter(Boolean));
    setExperienceList(sample.experience);
    setProjectList(sample.projects);
    setCertificationList(sample.certificationList || sample.certifications);
  };

  const fetchResumeDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`resume/${id}/`);
      const resData = response.data;

      const parseField = (data, type) => {
        if (!data) return [];
        try {
          const parsed = JSON.parse(data);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          if (type === "education") {
            return [{ school_college: data, degree: "", board_university: "", gpa: "", graduation_year: "" }];
          }
          if (type === "experience") {
            return [{ company: "", role: "", duration: data, description: "" }];
          }
          if (type === "projects") {
            return [{ title: data, technologies: "", link: "", description: "" }];
          }
          if (type === "certifications") {
            return [{ name: data, issuer: "", year: "" }];
          }
          return [];
        }
      };

      setFormData({
        full_name: resData.full_name || "",
        email: resData.email || "",
        phone: resData.phone || "",
        address: resData.address || "",
        linkedin: resData.linkedin || "",
        github: resData.github || "",
        summary: resData.summary || "",
        template: resData.template || "Modern Professional",
      });

      setEducationList(parseField(resData.education, "education"));
      setExperienceList(parseField(resData.experience, "experience"));
      setProjectList(parseField(resData.projects, "projects"));
      setCertificationList(parseField(resData.certifications, "certifications"));

      if (resData.skills) {
        setSkillTags(resData.skills.split(",").map(t => t.trim()).filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
      toast.error("Error loading resume details.");
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
    // Remove error label upon input typing
    if (formErrors[e.target.name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  // Get live words counter
  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Validation mechanics
  const validateForm = () => {
    const errors = {};

    if (!formData.full_name) errors.full_name = "Full name is required.";
    if (!formData.email) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.summary) errors.summary = "Professional summary is required.";

    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedin)) {
      errors.linkedin = "Please enter a valid LinkedIn URL.";
    }
    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/.*$/.test(formData.github)) {
      errors.github = "Please enter a valid GitHub URL.";
    }

    // Education validations
    educationList.forEach((edu, idx) => {
      if (!edu.school_college) errors[`edu_${idx}_school`] = "School / College is required.";
      if (!edu.degree) errors[`edu_${idx}_degree`] = "Degree is required.";
      if (!edu.graduation_year) errors[`edu_${idx}_year`] = "Graduation year is required.";
    });

    // Experience validations
    experienceList.forEach((exp, idx) => {
      if (!exp.company) errors[`exp_${idx}_company`] = "Company name is required.";
      if (!exp.role) errors[`exp_${idx}_role`] = "Job title is required.";
      if (!exp.start_date) errors[`exp_${idx}_start_date`] = "Start date is required.";
      if (!exp.currently_working && !exp.end_date) errors[`exp_${idx}_end_date`] = "End date is required.";
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form before saving.");
      
      // Auto collapse sections and open the one that has errors
      const errorKeys = Object.keys(formErrors);
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        if (firstErrorKey.startsWith("edu_")) setActiveSection("education");
        else if (firstErrorKey.startsWith("exp_")) setActiveSection("experience");
        else setActiveSection("personal");
      }

      // Smooth scroll to the error
      setTimeout(() => {
        const firstInvalid = document.querySelector(".input-error-msg");
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
      return;
    }

    // Compute formatted experience duration for backward compatibility
    const processedExperience = experienceList.map(exp => ({
      ...exp,
      duration: `${exp.start_date} - ${exp.currently_working ? 'Present' : exp.end_date}`,
      description: exp.description || ""
    }));

    const submissionData = {
      ...formData,
      education: JSON.stringify(educationList),
      experience: JSON.stringify(processedExperience),
      projects: JSON.stringify(projectList),
      certifications: JSON.stringify(certificationList),
      skills: skillTags.join(", "),
      languages: "",
      awards: "",
      references: "",
      interests: ""
    };

    try {
      setLoading(true);
      if (id) {
        await api.put(`resume/${id}/`, submissionData);
        toast.success("Resume saved successfully!");
        navigate(`/resume-view/${id}`);
      } else {
        const response = await api.post("resume/", submissionData);
        toast.success("Resume created successfully!");
        navigate(`/resume-view/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to save resume details.");
    } finally {
      setLoading(false);
    }
  };

  // Education list handlers
  const addEducation = () => {
    setEducationList([...educationList, { school_college: "", degree: "", board_university: "", gpa: "", graduation_year: "" }]);
  };
  const removeEducation = (index) => {
    setEducationList(educationList.filter((_, idx) => idx !== index));
  };
  const handleEducationChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  // Experience handlers
  const addExperience = () => {
    setExperienceList([...experienceList, { company: "", role: "", start_date: "", end_date: "", currently_working: false, description: "" }]);
  };
  const removeExperience = (index) => {
    setExperienceList(experienceList.filter((_, idx) => idx !== index));
  };
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceList];
    if (field === "currently_working") {
      updated[index][field] = !updated[index][field];
      if (updated[index][field]) updated[index]["end_date"] = "";
    } else {
      updated[index][field] = value;
    }
    setExperienceList(updated);
  };

  // Project handlers
  const addProject = () => {
    setProjectList([...projectList, { title: "", technologies: "", link: "", demo_link: "", description: "" }]);
  };
  const removeProject = (index) => {
    setProjectList(projectList.filter((_, idx) => idx !== index));
  };
  const handleProjectChange = (index, field, value) => {
    const updated = [...projectList];
    updated[index][field] = value;
    setProjectList(updated);
  };

  // Certification handlers
  const addCertification = () => {
    setCertificationList([...certificationList, { name: "", issuer: "", year: "", credential_id: "", credential_url: "" }]);
  };
  const removeCertification = (index) => {
    setCertificationList(certificationList.filter((_, idx) => idx !== index));
  };
  const handleCertificationChange = (index, field, value) => {
    const updated = [...certificationList];
    updated[index][field] = value;
    setCertificationList(updated);
  };

  // Live state representation for Live Preview
  const liveResumeData = {
    ...formData,
    education: educationList,
    experience: experienceList.map(exp => ({
      ...exp,
      duration: `${exp.start_date} - ${exp.currently_working ? 'Present' : exp.end_date}`,
      description: exp.description || ""
    })),
    projects: projectList,
    certifications: certificationList,
    skills: skillTags.join(", ")
  };

  return (
    <div className="resume-builder-page">
      <div className="builder-layout-grid">
        
        {/* Left Hand: Form Section */}
        <div className="builder-form-column no-print">
          {/* Navigation Action Header */}
          <div className="form-action-header">
            <Link to="/dashboard" className="back-link">
              <FaArrowLeft /> Back to Dashboard
            </Link>
          </div>

          <div className="builder-intro-block" style={{ textAlign: "left" }}>
            <h1>Resume Workspace</h1>
            <p className="subtitle" style={{ margin: "0 0 20px 0" }}>
              Configure your template, fill in your details, and preview it in real time.
            </p>
          </div>

          {/* Style Template Selector (Horizontal Large Cards Grid) */}
          <ResumeTemplates
            selectedTemplate={formData.template}
            setSelectedTemplate={(tplName) => {
              setFormData((prev) => ({ ...prev, template: tplName }));
            }}
          />

          <form onSubmit={handleSubmit} className="builder-form-wrapper">
            
            {/* Card: Personal Information */}
            <div className={`section-card ${activeSection === "personal" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("personal")}>
                <div className="header-title-wrapper">
                  <FaUser className="section-icon" />
                  <h2>Personal Information</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "personal" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "personal" && (
                <div className="section-card-body">
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Full Name <span className="req-star">*</span></label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={formErrors.full_name ? "input-err" : ""}
                      />
                      {formErrors.full_name && <span className="input-error-msg">{formErrors.full_name}</span>}
                    </div>

                    <div className="input-group">
                      <label>Email Address <span className="req-star">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={formErrors.email ? "input-err" : ""}
                      />
                      {formErrors.email && <span className="input-error-msg">{formErrors.email}</span>}
                    </div>

                    <div className="input-group">
                      <label>Phone Number <span className="req-star">*</span></label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className={formErrors.phone ? "input-err" : ""}
                      />
                      {formErrors.phone && <span className="input-error-msg">{formErrors.phone}</span>}
                    </div>

                    <div className="input-group">
                      <label>Physical Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="input-group">
                      <label>LinkedIn Profile URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className={formErrors.linkedin ? "input-err" : ""}
                      />
                      {formErrors.linkedin && <span className="input-error-msg">{formErrors.linkedin}</span>}
                    </div>

                    <div className="input-group">
                      <label>GitHub Profile URL</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className={formErrors.github ? "input-err" : ""}
                      />
                      {formErrors.github && <span className="input-error-msg">{formErrors.github}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card: Professional Summary */}
            <div className={`section-card ${activeSection === "summary" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("summary")}>
                <div className="header-title-wrapper">
                  <FaFileAlt className="section-icon" />
                  <h2>Professional Summary</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "summary" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "summary" && (
                <div className="section-card-body">
                  <div className="input-group">
                    <label>Describe your career objectives and milestones <span className="req-star">*</span></label>
                    <textarea
                      rows="4"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="E.g. Dynamic software developer with 3+ years experience..."
                      className={formErrors.summary ? "input-err" : ""}
                    ></textarea>
                    <div className="word-count-row">
                      <span>Words: {getWordCount(formData.summary)} / 200</span>
                      <span className="word-recommend">Recommended: 80–150 words</span>
                    </div>
                    {formErrors.summary && <span className="input-error-msg">{formErrors.summary}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Card: Education List */}
            <div className={`section-card ${activeSection === "education" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("education")}>
                <div className="header-title-wrapper">
                  <FaGraduationCap className="section-icon" />
                  <h2>Education</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "education" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "education" && (
                <div className="section-card-body">
                  <div className="education-entries-container">
                    {educationList.map((edu, idx) => (
                      <div key={idx} className="education-card-entry">
                        <div className="card-entry-header">
                          <h4>Education Record #{idx + 1}</h4>
                          <button type="button" className="remove-entry-btn" onClick={() => removeEducation(idx)}>
                            <FaTrash /> Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="input-group">
                            <label>School / College <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={edu.school_college || edu.school || ""}
                              onChange={(e) => handleEducationChange(idx, "school_college", e.target.value)}
                              placeholder="E.g. Harvard University"
                              className={formErrors[`edu_${idx}_school`] ? "input-err" : ""}
                            />
                            {formErrors[`edu_${idx}_school`] && <span className="input-error-msg">{formErrors[`edu_${idx}_school`]}</span>}
                          </div>
                          <div className="input-group">
                            <label>Degree <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                              placeholder="E.g. Bachelor of Science in CS"
                              className={formErrors[`edu_${idx}_degree`] ? "input-err" : ""}
                            />
                            {formErrors[`edu_${idx}_degree`] && <span className="input-error-msg">{formErrors[`edu_${idx}_degree`]}</span>}
                          </div>
                          <div className="input-group">
                            <label>Board / University</label>
                            <input
                              type="text"
                              value={edu.board_university || ""}
                              onChange={(e) => handleEducationChange(idx, "board_university", e.target.value)}
                              placeholder="E.g. Cambridge Board"
                            />
                          </div>
                          <div className="input-group">
                            <label>GPA / Percentage</label>
                            <input
                              type="text"
                              value={edu.gpa || ""}
                              onChange={(e) => handleEducationChange(idx, "gpa", e.target.value)}
                              placeholder="E.g. 3.8 / 4.0"
                            />
                          </div>
                          <div className="input-group">
                            <label>Graduation Year <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={edu.graduation_year || ""}
                              onChange={(e) => handleEducationChange(idx, "graduation_year", e.target.value)}
                              placeholder="E.g. 2024"
                              className={formErrors[`edu_${idx}_year`] ? "input-err" : ""}
                            />
                            {formErrors[`edu_${idx}_year`] && <span className="input-error-msg">{formErrors[`edu_${idx}_year`]}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {educationList.length === 0 ? (
                      <div className="compact-empty-state">
                        <p>No education details added yet.</p>
                        <button type="button" className="add-entry-btn" onClick={addEducation}>
                          <FaPlus /> Add Education
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="add-entry-btn" onClick={addEducation}>
                        <FaPlus /> Add Education
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card: Experience List */}
            <div className={`section-card ${activeSection === "experience" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("experience")}>
                <div className="header-title-wrapper">
                  <FaBriefcase className="section-icon" />
                  <h2>Work Experience</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "experience" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "experience" && (
                <div className="section-card-body">
                  <div className="education-entries-container">
                    {experienceList.map((exp, idx) => (
                      <div key={idx} className="education-card-entry">
                        <div className="card-entry-header">
                          <h4>Work Record #{idx + 1}</h4>
                          <button type="button" className="remove-entry-btn" onClick={() => removeExperience(idx)}>
                            <FaTrash /> Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="input-group">
                            <label>Company Name <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={exp.company || ""}
                              onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                              placeholder="E.g. Microsoft"
                              className={formErrors[`exp_${idx}_company`] ? "input-err" : ""}
                            />
                            {formErrors[`exp_${idx}_company`] && <span className="input-error-msg">{formErrors[`exp_${idx}_company`]}</span>}
                          </div>
                          <div className="input-group">
                            <label>Job Title <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={exp.role || ""}
                              onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                              placeholder="E.g. Frontend Engineer"
                              className={formErrors[`exp_${idx}_role`] ? "input-err" : ""}
                            />
                            {formErrors[`exp_${idx}_role`] && <span className="input-error-msg">{formErrors[`exp_${idx}_role`]}</span>}
                          </div>
                          <div className="input-group">
                            <label>Start Date (Year/Month) <span className="req-star">*</span></label>
                            <input
                              type="text"
                              value={exp.start_date || ""}
                              onChange={(e) => handleExperienceChange(idx, "start_date", e.target.value)}
                              placeholder="E.g. Jan 2022"
                              className={formErrors[`exp_${idx}_start_date`] ? "input-err" : ""}
                            />
                            {formErrors[`exp_${idx}_start_date`] && <span className="input-error-msg">{formErrors[`exp_${idx}_start_date`]}</span>}
                          </div>
                          <div className="input-group">
                            <label>End Date (Year/Month) {!exp.currently_working && <span className="req-star">*</span>}</label>
                            <input
                              type="text"
                              value={exp.end_date || ""}
                              onChange={(e) => handleExperienceChange(idx, "end_date", e.target.value)}
                              placeholder="E.g. Dec 2024"
                              disabled={exp.currently_working}
                              className={formErrors[`exp_${idx}_end_date`] ? "input-err" : ""}
                            />
                            {formErrors[`exp_${idx}_end_date`] && <span className="input-error-msg">{formErrors[`exp_${idx}_end_date`]}</span>}
                          </div>
                        </div>
                        <div className="checkbox-subgroup" style={{ marginTop: "12px" }}>
                          <input
                            type="checkbox"
                            id={`work_current_${idx}`}
                            checked={exp.currently_working || false}
                            onChange={() => handleExperienceChange(idx, "currently_working")}
                          />
                          <label htmlFor={`work_current_${idx}`} style={{ fontSize: "13.5px", marginLeft: "6px", cursor: "pointer" }}>
                            I am currently working here
                          </label>
                        </div>
                        <div className="input-group" style={{ marginTop: "15px" }}>
                          <label>Responsibilities & Achievements</label>
                          <textarea
                            rows="3"
                            value={exp.description || ""}
                            onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                            placeholder="List accomplishments..."
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    {experienceList.length === 0 ? (
                      <div className="compact-empty-state">
                        <p>No work history added yet.</p>
                        <button type="button" className="add-entry-btn" onClick={addExperience}>
                          <FaPlus /> Add Work Experience
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="add-entry-btn" onClick={addExperience}>
                        <FaPlus /> Add Work Experience
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card: Skills */}
            <div className={`section-card ${activeSection === "skills" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("skills")}>
                <div className="header-title-wrapper">
                  <FaCode className="section-icon" />
                  <h2>Skills</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "skills" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "skills" && (
                <div className="section-card-body">
                  <SkillInput
                    skillTags={skillTags}
                    setSkillTags={setSkillTags}
                  />
                </div>
              )}
            </div>

            {/* Card: Projects */}
            <div className={`section-card ${activeSection === "projects" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("projects")}>
                <div className="header-title-wrapper">
                  <FaCode className="section-icon" />
                  <h2>Projects</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "projects" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "projects" && (
                <div className="section-card-body">
                  <div className="education-entries-container">
                    {projectList.map((proj, idx) => (
                      <div key={idx} className="education-card-entry">
                        <div className="card-entry-header">
                          <h4>Project Record #{idx + 1}</h4>
                          <button type="button" className="remove-entry-btn" onClick={() => removeProject(idx)}>
                            <FaTrash /> Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="input-group">
                            <label>Project Title</label>
                            <input
                              type="text"
                              value={proj.title || ""}
                              onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                              placeholder="E.g. E-Commerce Platform"
                            />
                          </div>
                          <div className="input-group">
                            <label>GitHub Repository URL</label>
                            <input
                              type="url"
                              value={proj.link || ""}
                              onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                          <div className="input-group">
                            <label>Live Demo URL</label>
                            <input
                              type="url"
                              value={proj.demo_link || ""}
                              onChange={(e) => handleProjectChange(idx, "demo_link", e.target.value)}
                              placeholder="https://my-live-demo.com"
                            />
                          </div>
                        </div>
                        <div className="input-group" style={{ marginTop: "15px" }}>
                          <label>Project Description</label>
                          <textarea
                            rows="3"
                            value={proj.description || ""}
                            onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                            placeholder="Describe the application features..."
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    {projectList.length === 0 ? (
                      <div className="compact-empty-state">
                        <p>No project portfolios added yet.</p>
                        <button type="button" className="add-entry-btn" onClick={addProject}>
                          <FaPlus /> Add Project
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="add-entry-btn" onClick={addProject}>
                        <FaPlus /> Add Project
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card: Certifications */}
            <div className={`section-card ${activeSection === "certifications" ? "active-accordion" : ""}`}>
              <div className="section-card-header" onClick={() => toggleSection("certifications")}>
                <div className="header-title-wrapper">
                  <FaCertificate className="section-icon" />
                  <h2>Certifications</h2>
                </div>
                <span className="accordion-toggle-icon">
                  {activeSection === "certifications" ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeSection === "certifications" && (
                <div className="section-card-body">
                  <div className="education-entries-container">
                    {certificationList.map((cert, idx) => (
                      <div key={idx} className="education-card-entry">
                        <div className="card-entry-header">
                          <h4>Certification Record #{idx + 1}</h4>
                          <button type="button" className="remove-entry-btn" onClick={() => removeCertification(idx)}>
                            <FaTrash /> Remove
                          </button>
                        </div>
                        <div className="form-grid">
                          <div className="input-group">
                            <label>Certificate Name</label>
                            <input
                              type="text"
                              value={cert.name || ""}
                              onChange={(e) => handleCertificationChange(idx, "name", e.target.value)}
                              placeholder="E.g. AWS Solutions Architect"
                            />
                          </div>
                          <div className="input-group">
                            <label>Issuing Organization</label>
                            <input
                              type="text"
                              value={cert.issuer || ""}
                              onChange={(e) => handleCertificationChange(idx, "issuer", e.target.value)}
                              placeholder="E.g. Amazon Web Services"
                            />
                          </div>
                          <div className="input-group">
                            <label>Issue Date (Year)</label>
                            <input
                              type="text"
                              value={cert.year || ""}
                              onChange={(e) => handleCertificationChange(idx, "year", e.target.value)}
                              placeholder="E.g. 2023"
                            />
                          </div>
                          <div className="input-group">
                            <label>Credential ID (Optional)</label>
                            <input
                              type="text"
                              value={cert.credential_id || ""}
                              onChange={(e) => handleCertificationChange(idx, "credential_id", e.target.value)}
                              placeholder="E.g. AWS-11928"
                            />
                          </div>
                          <div className="input-group" style={{ gridColumn: "span 2" }}>
                            <label>Credential URL (Optional)</label>
                            <input
                              type="url"
                              value={cert.credential_url || ""}
                              onChange={(e) => handleCertificationChange(idx, "credential_url", e.target.value)}
                              placeholder="https://verify.aws.com/credential"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {certificationList.length === 0 ? (
                      <div className="compact-empty-state">
                        <p>No credentials added yet.</p>
                        <button type="button" className="add-entry-btn" onClick={addCertification}>
                          <FaPlus /> Add Certification
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="add-entry-btn" onClick={addCertification}>
                        <FaPlus /> Add Certification
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Verification terms */}
            <div className="checkbox-area">
              <input type="checkbox" id="verification-confirm" required />
              <label htmlFor="verification-confirm">
                I verify that all personal details and qualifications filled out are correct.
              </label>
            </div>

            {/* Actions Button Area */}
            <div className="button-area" style={{ marginTop: "30px", marginBottom: "30px" }}>
              <button type="submit" className="save-btn" disabled={loading}>
                <FaCheck style={{ marginRight: "8px" }} /> {loading ? "Saving..." : "Save & Preview Resume"}
              </button>
            </div>

          </form>
        </div>

        {/* Right Hand: Live Preview Column */}
        <div className="builder-preview-column no-print">
          <div className="preview-sheet-container">
            <ResumePreview
              resume={liveResumeData}
              template={formData.template}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResumeForm;