import React from "react";
import ModernResume from "./templates/ModernResume";
import SoftwareResume from "./templates/SoftwareResume";
import AnalystResume from "./templates/AnalystResume";
import DesignerResume from "./templates/DesignerResume";
import MinimalATSResume from "./templates/MinimalATSResume";

function ResumePreview({ resume, template }) {
  if (!resume) return null;

  const currentTemplate = template || resume.template || "Modern Professional";

  switch (currentTemplate) {
    case "Modern Professional":
      return <ModernResume resume={resume} />;
    case "Software Engineer":
      return <SoftwareResume resume={resume} />;
    case "Data Analyst":
      return <AnalystResume resume={resume} />;
    case "Graphic Designer":
      return <DesignerResume resume={resume} />;
    case "Minimal ATS":
      return <MinimalATSResume resume={resume} />;
    default:
      return <ModernResume resume={resume} />;
  }
}

export default ResumePreview;
