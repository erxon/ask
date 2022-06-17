import React from "react";
import Avatar from "./Avatar";

function User(props) {
    return (
        <div class="user col-lg-4 col-md-6">
            <div class="row gx-0 shadow border pb-4 mb-3">
                <div class="col-2">
                    <Avatar picture={props.picture} custom="m-3 mt-4" />
                </div>
                <div class="info col-10 pt-4 ps-4">
                    <h6>{props.name}</h6>
                    <p class="time">Joined {props.timeJoined}</p>
                    <p>{props.about}</p>
                    <a href="#">Follow</a>
                </div>
            </div>
        </div>
    )
}

export default User;
