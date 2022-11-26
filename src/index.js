import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Household from "./pages/Household";
import { Map } from "./pages/Map";
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/household/:id" element={<Household />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
