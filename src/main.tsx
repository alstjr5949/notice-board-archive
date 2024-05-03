import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Report1 from "./1/Report1.tsx";
import Report2 from "./2/Report2.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/report/1" element={<Report1 />} />
        <Route path="/report/2" element={<Report2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
