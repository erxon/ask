import React from "react";
import Avatar from "../user/Avatar";


function UserDetails(props) {
    return (
        <div class="user-details row gx-0 container-fluid">
            <div class="col-2">
                <div class="ms-3">
                    <Avatar picture={props.photo} />
                </div>
            </div>
            
            <div class="col-10 mt-1">
                <h6>{props.name}</h6>
                <p class="time">Joined {props.date}</p>
            </div>
        </div>
    )
}

export default UserDetails;