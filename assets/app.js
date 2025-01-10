import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/index.jsx"; // Import des routes

import "./styles/app.css"; // Styles globaux

// Sélectionnez l'élément où React sera monté
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // React 18
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
