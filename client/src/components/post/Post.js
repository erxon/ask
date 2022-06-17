import React from "react";
import Avatar from "../user/Avatar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function Post(props) {
    return (
        <div>
            <div class="user row">
                <div class="col-2 px-4">
                    <Avatar picture={props.picture} />
                </div>
                <div class="col-10">
                    <h5>{props.name}</h5>
                    <h6 class="text-muted time">{props.timeAgo}</h6>
                </div>
            </div>
            <div class="question-preview mt-4">
                <h4>{props.heading}</h4>
                <p>{props.content}</p>
            </div>

            <div class="icon-buttons">
                <div class="like-button d-inline me-3">
                    <div class="icon d-inline">
                        <a class="icon-button" href="#"><FontAwesomeIcon icon={regular("thumbs-up")} /></a>
                    </div>
                    <p class="d-inline text-muted ms-1">24</p>
                </div>
                <div class="comment-button d-inline me-3">
                    <div class="icon d-inline">
                        <a class="icon-button" href="#"><FontAwesomeIcon icon={regular("comment")} /></a>
                    </div>
                    <p class="d-inline text-muted ms-1">12</p>
                </div>
                <div class="answer-button d-inline">
                    <div class="icon d-inline">
                        <a class="icon-button" href="#"><FontAwesomeIcon icon={regular("pen-to-square")} /></a>
                    </div>
                    <p class="d-inline text-muted ms-1">1</p>
                </div>
            </div>
        </div>
    )

}

export default Post;