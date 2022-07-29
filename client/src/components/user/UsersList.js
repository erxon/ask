import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import User from "./User";
import { list } from "./api-user";

function Users() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    list()
      .then((response) => {
        setValues([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div class="users-view">
        <div class="user-list row">
          {values &&
            values.map((user) => {
              return (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  timeJoined={user.created}
                  about={user.about}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Users;
