import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/theme.css";

console.log("🚀 Application starting...");

// Catch any unhandled errors
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ Root element not found!");
} else {
  console.log("✅ Root element found, rendering app...");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log("✅ App rendered!");
}
