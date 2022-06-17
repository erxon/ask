import React from "react";
import Avatar from "../user/Avatar";
import pic from "../img/1.jpg";
import { ThumbsupIcon, ReplyIcon } from '@primer/octicons-react'

function Comment(props) {
    return (
        <div>
            <div class="row gx-0 mb-3">
                <div class="col-2"> 
                    <Avatar picture={props.picture} />
                </div>
                <div class="border rounded col-10 p-3">
                    <div class="mb-2">  
                        <h6 class="d-inline">{props.name}</h6>
                        <p class="d-inline time"> {props.timeAgo} ago</p>
                    </div>
                    
                    <div>
                        <p class="comment-content">
                            {props.comment}
                        </p>
                    </div>
                    <div>
                        <div class="thumbs-up">
                            <ThumbsupIcon size={16} />
                            <p class="d-inline time"> {props.numOfLikes}</p>
                        </div>
                        <div class="reply">
                            <ReplyIcon size={16} />
                            <p class="d-inline time"> {props.numOfReplies}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;