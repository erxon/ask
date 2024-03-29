import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { comment } from "../Home/api-question";
import auth from "../auth/auth-helper";
import ProfilePhoto from "../user/ProfilePhoto";
function CommentSection(props) {
  //Comment
  //Comment input
  //add onClick in the send icon
  //add onChange in the comment input field
  //create a state object to store the comment
  const [values, setValues] = useState({
    postId: props.postId,
    content: "",
    userId: props.userId,
    userName: props.userName,
  });
  //add handleChange function
  const handleChange = (event) => {
    setValues({ ...values, content: event.target.value });
  };
  //add handleClick function
  const handleClick = () => {
    //post request comment to comment api "/api/comments"
    const data = {
      postId: values.postId,
      content: values.content,
      user: values.userId,
      userName: values.userName,
    };

    const jwt = auth.isAuthenticated();
    comment(data, { t: jwt.token })
      .then((response) => {
        setValues({
          postId: props.postId,
          content: "",
          userId: props.userId,
          userName: props.userName,
        });
        props.onSubmit(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="comment-section shadow-sm">
        <div className="comment-input content-fluid row border gx-0 p-4">
          <div className="col-2 px-3 py-2">
            <ProfilePhoto userId={props.userId} />
          </div>
          <div className="col-8 p-3">
            <input
              type="text"
              name="comment"
              onChange={handleChange}
              value={values.content}
              placeholder="type your comment here"
              className="form-control"
            />
          </div>
          <div className="col-2">
            <div className="send-icon text-center mt-4">
              <button className="btn btn-link" onClick={handleClick}>
                <FontAwesomeIcon icon={solid("paper-plane")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
