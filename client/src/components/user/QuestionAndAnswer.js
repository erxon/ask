import React, { useState } from "react";
import auth from "../auth/auth-helper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function QuestionAndAnswer(props) {
  const [openForm, setOpenForm] = useState(false);
  const [editValues, setEditValues] = useState({
    postTitle: props.postTitle,
    postBody: props.postContent,
  });

  let route = "";

  if (props.postTag === "question") {
    route = `/post/${props.postId}`;
  } else if (props.postTag === "answer") {
    route = `/post/answers/${props.postId}`;
  }

  const deleteClick = () => {
    props.onDelete(props.postId);
  };

  const handleEditClick = () => {
    setOpenForm(!openForm);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };
  const datePosted = new Date(props.postedAt);
  return (
    <div>
      {/*
        Add edit and delete button if jwt.user._id === props.userId
        */}

      <div className="posted-question">
        <h5 className="mb-0">{props.postTitle}</h5>
        <p className="date">{datePosted.toDateString()}</p>
        <p>{props.postContent}</p>
        <div className="d-flex flex-row">
          <div className="align-self-center">
            <a href={route}>View</a>
          </div>
          {auth.isAuthenticated().user._id === props.userId && (
            <div>
              <IconButton onClick={deleteClick} size="small">
                <DeleteIcon fontSize="small" sx={{ color: "#ed4a4f" }} />
              </IconButton>
              <IconButton onClick={handleEditClick} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
        {openForm && (
          <div>
            <input
              className="form-control mb-3"
              placeholder="Edit your question title here"
              name="postTitle"
              value={editValues.postTitle}
              onChange={handleEditChange}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Edit your question content here"
              name="postBody"
              value={editValues.postBody}
              onChange={handleEditChange}
            />
            <button
              className="btn btn-custom"
              onClick={() => {
                props.onSubmit(props.postId, editValues, setEditValues);
              }}
            >
              Submit
            </button>
          </div>
        )}
        <hr />
      </div>
      <div></div>
    </div>
  );
}

export default QuestionAndAnswer;
