import React from "react";
import ProfilePhoto from "./ProfilePhoto";

function User(props) {
  const timeJoined = new Date(props.timeJoined);

  return (
    <div className="user col-lg-4 col-md-6">
      <div className="d-flex flex-row align-items-center border shadow-sm mb-3 bg-white">
        <div className="text-center mb-2 mt-2 ms-2">
          <ProfilePhoto userId={props.userId} />
        </div>
        <div className="info container-fluid d-flex flex-column">
          <div className="mt-2">
            <a style={{ color: "#000" }} href={"/profile/" + props.userId}>
              {props.name}
            </a>
          </div>
          {
            <div>
              {props.timeJoined && (
                <p class="time">Joined {timeJoined.toDateString()}</p>
              )}
              <p>{props.about}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default User;
