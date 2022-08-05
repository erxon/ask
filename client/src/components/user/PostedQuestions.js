import React, { useEffect, useState } from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { update, question, questions, remove } from "../Home/api-question";
import auth from "../auth/auth-helper";
import { Snackbar } from "@mui/material";

function PostedQuestions(props) {
  const [questionValues, setQuestions] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const jwt = auth.isAuthenticated();
  let message = "";

  useEffect(() => {
    questions()
      .then((response) => {
        console.log(response);
        setQuestions(
          response.data.filter((post) => {
            if ("user" in post) {
              return post.user === props.userId;
            }
          })
        );
        console.log(questionValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (postId) => {
    setQuestions(
      questionValues.filter((post) => {
        return post._id !== postId;
      })
    );
    remove({ questionId: postId }, { t: jwt.token })
      .then((response) => {
        console.log(response);
        setSnackbar({ open: true, message: "Question successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (postId, values, setEditValues) => {
    console.log(values);

    let newArray = questionValues.map((question) => {
      if (question._id === postId) {
        return {
          ...question,
          questionTitle: values.postTitle,
          questionBody: values.postBody,
        };
      } else {
        return question;
      }
    });
    setQuestions(newArray);
    update(
      {
        questionId: postId,
        questionTitle: values.postTitle,
        questionBody: values.postBody,
      },
      {
        t: jwt.token,
      }
    )
      .then(() => {
        setSnackbar({ open: true, message: "Question successfully edited" });
        setEditValues({ postTitle: "", postBody: "" });
      })
      .catch((err) => {
        message = "";
      });
  };

  const handleClose = () => {
    setSnackbar({ open: false });
  };
  let index = -1;
  return (
    <div>
      {/*Map questions and answers posted by the user*/}
      {questionValues.length > 0 ? (
        questionValues.map((post) => {
          index = index + 1;
          return (
            <QuestionAndAnswer
              key={post._id}
              index={index}
              postId={post._id}
              userId={post.user}
              onDelete={handleDelete}
              onSubmit={handleUpdate}
              postTitle={post.questionTitle}
              postContent={post.questionBody}
              postedAt={post.created}
              postTag={"question"}
            />
          );
        })
      ) : (
        <p>Didn't posted any questions yet</p>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        message={snackbar.message}
        onClose={handleClose}
      />
    </div>
  );
}

export default PostedQuestions;
