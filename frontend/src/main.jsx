import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#f9fafb",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 18px",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#fff" },
        },
      }}
    />
    <App />
  </React.StrictMode>
);