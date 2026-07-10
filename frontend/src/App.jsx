import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeForm from "./pages/ResumeForm";
import ResumeList from "./pages/ResumeList";
import Review from "./pages/Review";
import CoverLetter from "./pages/CoverLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-form" element={<ResumeForm />} />
<Route path="/resume-list" element={<ResumeList />} />
<Route path="/review" element={<Review />} />
<Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;