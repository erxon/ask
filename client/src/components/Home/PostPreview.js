import React from "react";
import pic from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function PostPreview(){
    return (
    <div class="p-4 shadow-sm post-preview rounded border mx-auto container-fluid">
        <div class="user row">
            <div class="col-2 px-4">
                <img src={pic} alt="" class="avatar" />
            </div>
            <div class="col-10">
                <h5>Sherlock Holmes</h5>
                <h6 class="text-muted time">5 seconds ago</h6>
            </div>
        </div>
        <div class="question-preview mt-4">
            <h4>Lorem ipsum dolor sit amet?</h4>
            <p>
                Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo 
                consequat. 
            </p>
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
    );
}

export default PostPreview;