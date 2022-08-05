import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar";
import { useParams } from "react-router-dom";
import ProfilePhoto from "./ProfilePhoto";
import auth from "../auth/auth-helper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FollowProfileButton from "./FollowProfileButton";
import { read, remove } from "./api-user";
import ProfileTab from "./ProfileTab";
import { Link, Navigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { removeAllQuestions, removeAllComments } from "../Home/api-question";
import { removeAllAnswers } from "../answers/api-answer";

function Profile() {
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    following: false,
  });
  const [navigate, setNavigate] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    read({ userId: userId }, { t: jwt.token })
      .then((response) => {
        let following = checkFollow(response.data);
        setValues({ user: response.data, following: following });
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, [userId]);

  const dateJoined = values && new Date(values.user.created);
  /* */
  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      values.user._id
    ).then((response) => {
      if (response.data.error) {
        setValues({ ...values, error: response.data.error });
      } else {
        setValues({
          ...values,
          user: response.data,
          following: !values.following,
        });
      }
    });
  };

  const handleOpenClick = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);

    remove({ userId: userId }, { t: jwt.token })
      .then((response) => {
        auth.clearJWT(() => console.log("deleted"));
        setNavigate(true);
      })
      .catch((err) => {
        console.log(err);
      });

    //remove questions posted
    removeAllAnswers({ userId: userId })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    //remove answers posted
    removeAllComments({ userId: userId })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    //remove comments
    removeAllQuestions({ userId: userId })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (navigate) {
    window.location = "/";
  }
  /* */

  return (
    <div>
      <div class="profile border shadow-sm">
        <div class="center">
          <ProfilePhoto userId={userId} />
        </div>
        <div class="center user-info">
          <h3>{values.user.name && values.user.name}</h3>
          <p class="date">Joined: {dateJoined.toDateString()} </p>
          <p class="about d-inline">{values && values.user.about}</p>
          {auth.isAuthenticated().user &&
          auth.isAuthenticated().user._id == userId ? (
            <div className="edit-profile-icon text-center">
              <IconButton onClick={handleOpenClick} size="small">
                <DeleteIcon fontSize="small" sx={{ color: "#ed4a4f" }} />
              </IconButton>
              <Link to="/user/edit">
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
            </div>
          ) : (
            <FollowProfileButton
              following={values.following}
              onButtonClick={clickFollowButton}
            />
          )}
        </div>
        {/*pass userId*/}
        <ProfileTab
          following={values.user.following}
          followers={values.user.followers}
          userId={values.user._id}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
