import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import CommentSection from "./CommentSection";
import CommentThread from "./CommentThread";
import Post from "./Post";
import auth from "../auth/auth-helper";
import { useParams } from "react-router-dom";
import { question, listComments, deleteComment } from "../Home/api-question";
import Comment from "./Comment";
function PostDetailed() {
  const { questionId } = useParams();
  const jwt = auth.isAuthenticated();
  const [post, setPost] = useState({});
  const [values, setValues] = useState([]);

  useEffect(() => {
    question({ questionId: questionId }, { t: jwt.token })
      .then((response) => {
        const data = response.data;
        setPost({ ...data });
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
            return comment.postId === questionId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const handleDelete = (id) => {
    deleteComment({ commentId: id }, { t: jwt.token })
      .then((response) => {
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
      <div class="p-4 shadow-sm post-detailed rounded border mx-auto container-fluid">
        {Object.keys(post).length !== 0 && (
          <Post post={post} credentials={jwt} />
        )}
      </div>
      <div class="comment-thread mx-auto">
        {values &&
          values.map((comment) => {
            return (
              <Comment
                key={comment._id}
                commentId={comment._id}
                userId={comment.user}
                userName={comment.userName}
                created={comment.created}
                content={comment.content}
                onDelete={handleDelete}
              />
            );
          })}
      </div>
      {Object.keys(post).length !== 0 && (
        <CommentSection
          userId={jwt.user._id}
          userName={jwt.user.name}
          postId={post._id}
          onSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
}

export default PostDetailed;
