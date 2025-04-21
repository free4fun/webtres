import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { applyTheme, getSavedTheme } from "./lib/theme";
import { ThemeProvider } from "@/components/ThemeProvider"


const root = ReactDOM.createRoot(document.getElementById("root")!);

applyTheme(getSavedTheme());
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);


