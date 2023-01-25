import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
