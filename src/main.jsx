import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/theme.css";
import "./assets/styles/forms.css";
import "./assets/styles/pageBanner.css";
// import { JoinUpdatesProvider } from "./context/JoinUpdatesContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    
        <App />
    </BrowserRouter>
  </StrictMode>
);
