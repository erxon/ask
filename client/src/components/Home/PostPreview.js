import React from "react";
import pic from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function PostPreview(){
    return (
    <div>
        <div class="user">
            <img src={pic} alt="" class="avatar" />
            <p class="name">Sherlock Holmes</p>
            <p class="time">43 mins</p>
        </div>
        <div class="question-preview">
            <h4>Lorem ipsum dolor sit amet?</h4>
            <p>
                Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo 
                consequat. 
            </p>
        </div>

        <div class="icon-buttons">
            <div class="like-button">
                <FontAwesomeIcon icon={regular("thumbs-up")} />
            </div>
            <div class="comment-button">
                <FontAwesomeIcon icon={regular("comment")} />
            </div>
            <div class="answer-button">
                <FontAwesomeIcon icon={regular("pen-to-square")} />
            </div>
        </div>
    </div>
    );
}

export default PostPreview;