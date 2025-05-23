import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./i18n";
import "./styles/reset.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
