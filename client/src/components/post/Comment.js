import React from "react";
import ProfilePhoto from "../user/ProfilePhoto";
import { displayElapsedTime } from "../helpers/displayElapsedTime";

function Comment(props) {
    return (
        <div>
            <div class="row gx-0 mb-3">
                <div class="col-2"> 
                    <ProfilePhoto userId={props.userId} />
                </div>
                <div class="border rounded col-10 p-3">
                    <div class="mb-2">  
                        <h6 class="d-inline">{props.userName}</h6>
                        <p class="d-inline time"> {displayElapsedTime(props.created)} </p>
                    </div>
                    
                    <div>
                        <p class="comment-content">
                            {props.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;