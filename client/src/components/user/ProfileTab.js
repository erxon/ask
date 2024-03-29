import React, { useState } from "react";
import User from "./User";
import PostedQuestions from "./PostedQuestions";
import PostedAnswers from "./PostedAnswers";

export default function ProfileTab(props) {
  const [tabs, setTabs] = useState({
    following: false,
    followers: false,
    questions: false,
    answers: false,
  });

  //handleClick -> if event.name === following -> following = true
  const handleClick = (event) => {
    setTabs({ [event.target.name]: true });
  };
  return (
    <div>
      <div className="text-center mb-3">
        <div className="tabs btn-group">
          <button
            className="btn btn-outline-secondary"
            name="following"
            onClick={handleClick}
          >
            Following
          </button>
          <button
            className="btn btn-outline-secondary"
            name="followers"
            data-bs-toggle="collapse"
            onClick={handleClick}
          >
            Followers
          </button>
          <button
            className="btn btn-outline-secondary"
            name="questions"
            data-bs-toggle="collapse"
            onClick={handleClick}
          >
            Questions
          </button>
          <button
            className="btn btn-outline-secondary"
            name="answers"
            data-bs-toggle="collapse"
            onClick={handleClick}
          >
            Answers
          </button>
        </div>
      </div>
      <div>
        {tabs.following && (
          <div
            className="user-view"
            style={{ backgroundColor: "#d9d9d9", padding: "10px" }}
          >
            <div class="following mt-3 mx-auto user-list row">
              {
                //map values.user.following to User
                props.following.length > 0 ? (
                  props.following.map((user) => {
                    return (
                      <User key={user._id} userId={user._id} name={user.name} />
                    );
                  })
                ) : (
                  <p className="text-center">Not followed anyone yet</p>
                )
              }
            </div>
          </div>
        )}
        {tabs.followers && (
          <div style={{ backgroundColor: "#d9d9d9", padding: "10px" }}>
            <div className="followers mt-3 mx-auto">
              {props.followers.length > 0 ? (
                props.followers.map((user) => {
                  return (
                    <User key={user._id} userId={user._id} name={user.name} />
                  );
                })
              ) : (
                <p className="text-center">No followers yet</p>
              )}
            </div>
          </div>
        )}
        {tabs.questions && (
          <div style={{ backgroundColor: "#d9d9d9", padding: "10px" }}>
            <div className="questions mt-3 mx-auto">
              <PostedQuestions userId={props.userId && props.userId} />
            </div>
          </div>
        )}
        {tabs.answers && (
          <div style={{ backgroundColor: "#d9d9d9", padding: "10px" }}>
            <div className="questions mt-3 mx-auto">
              <PostedAnswers userId={props.userId && props.userId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
