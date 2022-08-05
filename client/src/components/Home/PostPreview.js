import React, { useEffect, useState } from "react";
import ProfilePhoto from "../user/ProfilePhoto";
import { vote, unvote } from "./api-question";
import auth from "../auth/auth-helper";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { listComments } from "./api-question";
import { listAnswers } from "../answers/api-answer";

function PostPreview(props) {
  //read likes

  //if like is clicked add user id in the usersVoted
  //if user's id already exists in the usersVoted, remove it
  //display the usersVoted length

  //Get request for the list of comments in comments api
  //render comments.length
  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    listComments()
      .then((response) => {
        setComments(
          response.data.filter((comment) => {
            return comment.postId === props.question._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    listAnswers({ questionId: props.question._id })
      .then((response) => {
        setAnswers([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let currentDate = new Date();
  let postCreatedDate = new Date(props.question.created);

  let timeDiff = currentDate.getTime() - postCreatedDate.getTime();
  timeDiff /= 1000;
  let seconds = Math.round(timeDiff);

  let displayElapsedDate = "";

  if (timeDiff < 60) {
    displayElapsedDate = "recent";
  } else if (timeDiff < 3600 && timeDiff > 60) {
    displayElapsedDate = Math.round(timeDiff / 60) + "m ago";
  } else if (timeDiff < 86400 && timeDiff > 3600) {
    displayElapsedDate = Math.round(timeDiff / 60 / 60) + "hr ago";
  } else {
    displayElapsedDate = postCreatedDate.toDateString();
  }

  const checkVote = (votes) => {
    let match = votes.indexOf(props.credentials.user._id) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    vote: checkVote(props.question.usersVoted),
    votes: props.question.usersVoted.length,
  });

  const clickLike = () => {
    let callApi = values.vote ? unvote : vote;
    const jwt = auth.isAuthenticated();
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      props.question._id
    ).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setValues({
          ...values,
          vote: !values.vote,
          votes: response.data.usersVoted.length,
        });
      }
    });
  };

  return (
    <div className="p-4 shadow-sm post-preview rounded border mx-auto container-fluid">
      <div className="user row">
        <div className="col-2 px-4">
          <ProfilePhoto userId={props.question.user} />
        </div>
        <div className="col-10">
          <h5>{props.question.userName}</h5>
          <h6 className="text-muted time">{displayElapsedDate}</h6>
        </div>
      </div>
      <div className="question-preview mt-4">
        <h4>{props.question.questionTitle}</h4>
        <p>
          {props.question.questionBody &&
          props.question.questionBody.length >= 300
            ? props.question.questionBody.substring(0, 300) + "..."
            : props.question.questionBody}
        </p>
      </div>

      <div className="icon-buttons">
        <div className="like-button d-inline me-3">
          <div className="icon d-inline">
            <a className="icon-button btn btn-link" onClick={clickLike}>
              {values.vote ? (
                <ThumbUpIcon sx={{ color: "#F66B0E" }} />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
            </a>
          </div>
          <p className="d-inline text-muted ms-1">{values.votes}</p>
        </div>
        <div className="comment-button d-inline me-3">
          <div className="icon d-inline">
            <a
              className="icon-button btn btn-link"
              href={"/post/" + props.question._id}
            >
              <CommentOutlinedIcon />
            </a>
          </div>
          <p className="d-inline text-muted ms-1">
            {comments && comments.length}
          </p>
        </div>
        <div className="answer-button d-inline">
          <div className="icon d-inline">
            <a
              className="icon-button"
              href={"/post/answers/" + props.question._id}
            >
              <QuestionAnswerOutlinedIcon />
            </a>
          </div>
          <p className="d-inline text-muted ms-1">
            {answers && answers.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
