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
        <Navbar />
        <Routes>
          <Route path="/" location="/" element={<Home />} />
          <Route path="/auth" element={<LoginAndSignup />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/user/edit" element={<EditProfile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post/:questionId" element={<PostDetailed />} />
          <Route
            path="/post/answers/:questionId"
            element={<PostWithAnswers />}
          />
          <Route
            path="/post/answers/comments/:answerId"
            element={<AnswerWithComments />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
