import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Home from "./components/Home/Home";
import EditProfile from "./components/user/EditProfile";
import LoginAndSignup from "./components/auth/LoginAndSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/user/UsersList";
import PostDetailed from "./components/post/PostDetailed";
import PostWithAnswers from "./components/answers/PostWithAnswers";
import AnswerWithComments from "./components/answers/AnswerWithComments";
import Profile from "./components/user/Profile";
import Navbar from "./components/Home/Navbar";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAndSignup />} />
          <Route path="/home" location="/" element={<Home />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/user/edit/:userId" element={<EditProfile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post/:questionId" element={<PostDetailed />} />
          <Route path="/post/answers" element={<PostWithAnswers />} />
          <Route path="/post/answers/comments" element={<AnswerWithComments />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );

}

export default App;
