import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import Home from "./components/Home/Home";
import EditProfile from "./components/user/EditProfile";
import LoginAndSignup from "./components/auth/LoginAndSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //route for the login & signup page
  //route for the home page
  //route for the profile of the user
  //route for the profile of other user
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAndSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

