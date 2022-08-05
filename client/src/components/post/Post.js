import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import ProfilePhoto from "../user/ProfilePhoto";
import { vote, unvote } from "../Home/api-question";
import auth from "../auth/auth-helper";
import { displayElapsedTime } from "../helpers/displayElapsedTime";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { listComments } from "../Home/api-question";
import { listAnswers } from "../answers/api-answer";
function Post(props) {
  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    listComments()
      .then((response) => {
        setComments(
          response.data.filter((comment) => {
            return comment.postId === props.post._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    listAnswers({ questionId: props.post._id })
      .then((response) => {
        setAnswers([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkVote = (votes) => {
    let match = votes.indexOf(props.credentials.user._id) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    vote: checkVote(props.post.usersVoted),
    votes: props.post.usersVoted.length,
  });

  const clickVote = () => {
    let callApi = values.vote ? unvote : vote;
    const jwt = auth.isAuthenticated();
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      props.post._id
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
    <div>
      <div className="user row">
        <div className="col-2 px-4">
          {props.post.user._id && <ProfilePhoto userId={props.post.user._id} />}
        </div>
        <div className="col-10">
          <h5>{props.post.user.name}</h5>
          <h6 className="text-muted time">
            {displayElapsedTime(props.post.created)}
          </h6>
        </div>
      </div>
      <div className="question-preview mt-4">
        <h4>{props.post.questionTitle}</h4>
        <p>{props.post.questionBody}</p>
      </div>

      <div className="icon-buttons">
        <div className="like-button d-inline me-3">
          <div className="icon d-inline">
            <a className="icon-button btn btn-link" onClick={clickVote}>
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
            <a className="icon-button btn btn-link">
              <CommentOutlinedIcon />
            </a>
          </div>
          <p className="d-inline text-muted ms-1">
            {comments && comments.length}
          </p>
        </div>
        <div className="answer-button d-inline">
          <div className="icon d-inline">
            <a className="icon-button" href={"/post/answers/" + props.post._id}>
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

export default Post;
