import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/context/ThemeProvider";
import { ModelProvider } from "./components/context/ModelProvider";
import { AuthProvider } from "./components/context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <ThemeProvider>
        <ModelProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ModelProvider>
      </ThemeProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
