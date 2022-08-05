import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { listComments } from "../Home/api-question";
function CommentThread(props) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    listComments()
      .then((response) => {
        setValues(
          response.data.filter((comment) => {
            return comment.postId === props.postId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="comment-thread mx-auto">
      {values &&
        values.map((comment) => {
          return (
            <Comment
              key={comment._id}
              userId={comment.userId}
              userName={comment.userName}
              created={comment.created}
              content={comment.content}
            />
          );
        })}
    </div>
  );
}

export default CommentThread;
