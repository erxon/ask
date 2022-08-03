import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import Navbar from "../Home/Navbar";
import CommentSection from "../post/CommentSection";
import Comment from "../post/Comment";
import CommentThread from "../post/CommentThread";
import { listComments, deleteComment } from "../Home/api-question";
import { useParams } from "react-router-dom";
import { answer } from "./api-answer";
import auth from "../auth/auth-helper";

function AnswerWithComments() {
  const { answerId } = useParams();
  const jwt = auth.isAuthenticated();
  console.log(jwt.token);
  const [answerValues, setAnswer] = useState({});
  const [values, setValues] = useState([]);

  console.log(answerId);
  useEffect(() => {
    answer({ answerId: answerId })
      .then((response) => {
        console.log(response.data);
        setAnswer({ ...response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    listComments()
      .then((response) => {
        setValues(
          response.data.filter((comment) => {
            return comment.postId === answerId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(values);

  const handleDelete = (id) => {
    deleteComment({ commentId: id }, { t: jwt.token })
      .then((response) => {
        console.log(id);
        console.log(response);
        setValues([
          ...values.filter((comment) => {
            return comment._id !== id;
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCommentSubmit = (newComment) => {
    setValues([...values, newComment]);
  };

  return (
    <div>
      <div class="single-answer mx-auto mt-4">
        {Object.keys(answerValues).length !== 0 && (
          <Answer answer={answerValues} jwt={jwt} />
        )}
      </div>
      <div>
        {/* <CommentThread postId={answerId} newComment={comment} /> */}
        <div class="comment-thread mx-auto">
          {values.length > 0 &&
            values.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  userId={comment.user}
                  commentId={comment._id}
                  onDelete={handleDelete}
                  userName={comment.userName}
                  created={comment.created}
                  content={comment.content}
                />
              );
            })}
        </div>
      </div>
      <div>
        {Object.keys(answerValues).length !== 0 && (
          <CommentSection
            userId={jwt.user._id}
            postId={answerId}
            userName={answerValues.user.name}
            onSubmit={handleCommentSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default AnswerWithComments;
