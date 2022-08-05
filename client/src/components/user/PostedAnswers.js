import React, { useEffect, useState } from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { remove, update, listAllAnswers } from "../answers/api-answer";
import auth from "../auth/auth-helper";
import { Snackbar } from "@mui/material";

function PostedAnswers(props) {
  //import api to retrieve question and answer
  //Call useEffect twice - retrieve questions and answers posted by the user
  //Create a State to store values
  //Information to retrieve: title, content, date created, post id, post tag (question or answer)
  const [answerValues, setAnswers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    listAllAnswers()
      .then((response) => {
        setAnswers(
          response.data.filter((post) => {
            if ("user" in post) {
              return post.user === props.userId;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (postId) => {
    setAnswers(
      answerValues.filter((post) => {
        return post._id !== postId;
      })
    );
    remove({ answerId: postId }, { t: jwt.token })
      .then((response) => {
        console.log(response);
        setSnackbar({ open: true, message: "Answer successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (postId, values, setEditValues) => {
    console.log(values);

    let newArray = answerValues.map((answer) => {
      if (answer._id === postId) {
        return {
          ...answer,
          answerTitle: values.postTitle,
          answerBody: values.postBody,
        };
      } else {
        return answer;
      }
    });
    setAnswers(newArray);
    update(
      {
        answerId: postId,
        answerTitle: values.postTitle,
        answerBody: values.postBody,
      },
      {
        t: jwt.token,
      }
    )
      .then(() => {
        setSnackbar({ open: true, message: "Answer successfully edited" });
        setEditValues({ postTitle: "", postBody: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setSnackbar({ open: false });
  };

  return (
    <div>
      {/*Map questions and answers posted by the user*/}
      {answerValues.length > 0 ? (
        answerValues.map((post) => {
          return (
            <QuestionAndAnswer
              key={post._id}
              postId={post._id}
              userId={post.user}
              onDelete={handleDelete}
              onSubmit={handleUpdate}
              postTitle={post.answerTitle}
              postContent={post.answerBody}
              postedAt={post.created}
              postTag={"answer"}
            />
          );
        })
      ) : (
        <p>Didn't answered any question yet</p>
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

export default PostedAnswers;
