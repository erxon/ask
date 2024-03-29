import React from "react";
import ProfilePhoto from "../user/ProfilePhoto";
import { displayElapsedTime } from "../helpers/displayElapsedTime";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import auth from "../auth/auth-helper";

function Comment(props) {
  const handleDeleteClick = () => {
    props.onDelete(props.commentId);
  };
  return (
    <div>
      <div className="row gx-0 mb-3">
        <div className="col-2">
          <ProfilePhoto userId={props.userId} />
        </div>
        <div className="border rounded col-10 p-3">
          <div className="mb-2">
            <h6 className="d-inline">{props.userName}</h6>
            <p className="d-inline time">
              {" "}
              {displayElapsedTime(props.created)}{" "}
            </p>
            <div className="d-inline">
              {auth.isAuthenticated().user._id === props.userId && (
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon fontSize="small" sx={{ color: "#ed4a4f" }} />
                </IconButton>
              )}
            </div>
          </div>

          <div className="align-self-center">
            <p className="comment-content">{props.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
