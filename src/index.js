import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Household from "./pages/Household";
import CreateHousehold from "./pages/CreateHousehold";
import EditHousehold from "./pages/EditHousehold";
import MyHouseholds from "./pages/MyHouseholds";
import { Map } from "./pages/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import PaypalGateway from "./pages/PaypalGateway";
import { Wrapper } from "./AppWrapper";
import MyBookings from "./pages/MyBookings";
import HomeFilter from "./pages/HomeFilter";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/' element={<Home />} />
          <Route path="/filter" element={<HomeFilter/>} />
          <Route path='/household/:id' element={<Household />} />
          <Route path='/CreateHousehold' element={<CreateHousehold />} />
          <Route path='/EditHousehold/:id' element={<EditHousehold />} />
          <Route path='/map' element={<Map />} />
          <Route path='/myhouseholds/:username' element={<MyHouseholds />} />
          <Route path='/mybookings/:username' element={<MyBookings />} />
          <Route path='/paypalGateway/:price' element={<PaypalGateway />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
