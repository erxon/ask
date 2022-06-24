import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import Home from "./components/Home/Home";
import EditProfile from "./components/user/EditProfile";
import LoginAndSignup from "./components/auth/LoginAndSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './components/user/UsersList';
import PostDetailed from './components/post/PostDetailed';
import PostWithAnswers from './components/answers/PostWithAnswers';
import AnswerWithComments from './components/answers/AnswerWithComments';
import Profile
 from './components/user/Profile';
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post" element={<PostDetailed />} />
        <Route path="/post/answers" element={<PostWithAnswers />} />
        <Route path="/post/answers/comments" element={<AnswerWithComments />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

