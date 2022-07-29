import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { useParams } from "react-router-dom";
import ProfilePhoto from "./ProfilePhoto";
import auth from "../auth/auth-helper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FollowProfileButton from "./FollowProfileButton";
import { read } from "./api-user";
import ProfileTab from "./ProfileTab";

function Profile() {
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    following: false,
  });

  useEffect(() => {
    read({ userId: userId }, { t: jwt.token })
      .then((response) => {
        let following = checkFollow(response.data);
        setValues({ ...values, user: response.data, following: following });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  /* */

  return (
    <div>
      <Navbar />
      <div class="profile border shadow-sm">
        <div class="center">
          <ProfilePhoto userId={userId} />
        </div>
        <div class="center user-info">
          <h3>{values.user.name && values.user.name}</h3>
          <p class="date">Joined: {dateJoined.toDateString()} </p>
          <p class="about d-inline">{values && values.about}</p>
          {auth.isAuthenticated().user &&
          auth.isAuthenticated().user._id == userId ? (
            <div className="d-inline ms-3 edit-profile-icon">
              <IconButton size="small">
                <DeleteIcon fontSize="small" sx={{color: "#ed4a4f"}}/>
              </IconButton>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
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
    </div>
  );
}

export default Profile;
