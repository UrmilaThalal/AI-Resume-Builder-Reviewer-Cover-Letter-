import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeForm from "./pages/ResumeForm";
import ResumeList from "./pages/ResumeList";
import Review from "./pages/Review";
import CoverLetter from "./pages/CoverLetter";
import ResumeView from "./pages/ResumeView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume-form" 
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume-edit/:id" 
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume-view/:id" 
          element={
            <ProtectedRoute>
              <ResumeView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume-list" 
          element={
            <ProtectedRoute>
              <ResumeList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/review" 
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cover-letter" 
          element={
            <ProtectedRoute>
              <CoverLetter />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;