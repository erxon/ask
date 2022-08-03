import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";
import auth from "../auth/auth-helper";
import { Navigate, useParams } from "react-router-dom";
import { questions } from "./api-question";
function Home() {
  //List questions

  //
  //Make the home component a public route
  //If the user is not yet authenticated, display in the navbar the sign in or sign up button
  //Link the sign in or sign up button to the "/" path

  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState([]);
  //Listing questions
  useEffect(() => {
    questions().then((response) => {
      let data = response.data;
      data.reverse();
      setValues([...data]);
    });
  }, []);
  const handleSubmit = (post) => {
    setValues([post, ...values]);
  };

  return (
    <div>
      {auth.isAuthenticated() && (
        <div>
          <div>
            <div class="m-4">
              <QuestionInput credentials={jwt} onSubmit={handleSubmit} />
            </div>
            <div class="post">
              {values.map((question) => {
                return (
                  <PostPreview
                    key={question._id}
                    question={question}
                    credentials={jwt}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!auth.isAuthenticated() && (
        <div
          style={{
            backgroundColor: "#d9d9d9",
            width: "500px",
            padding: "80px",
            margin: "10px",
          }}
        >
          <h1>Welcome to ASK</h1>
          <p>Please login to interact with the community</p>
        </div>
      )}
    </div>
  );
}

export default Home;
