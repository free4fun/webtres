import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { applyTheme, getSavedTheme } from "./lib/theme";
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "./context/authContext";


const root = ReactDOM.createRoot(document.getElementById("root")!);

applyTheme(getSavedTheme());
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);


