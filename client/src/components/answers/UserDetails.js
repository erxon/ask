import React, { useEffect, useState } from "react";
import { read } from "../user/api-user";
import ProfilePhoto from "../user/ProfilePhoto";

function UserDetails(props) {
  const [value, setValue] = useState({
    name: "",
    joined: "",
  });

  useEffect(() => {
    read({ userId: props.userId }, { t: props.jwt.token })
      .then((response) => {
        let dateJoined = new Date(response.data.created);
        setValue({
          ...value,
          name: response.data.name,
          joined: dateJoined.toDateString(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="user-details row gx-0 container-fluid">
      <div className="col-2">
        <div className="ms-3">
          {props.userId && <ProfilePhoto userId={props.userId} />}
        </div>
      </div>

      <div className="col-10 mt-1">
        <h6>{props.name ? props.name : value.name}</h6>
        <p className="time">Joined {value.joined && value.joined}</p>
      </div>
    </div>
  );
}

export default UserDetails;
