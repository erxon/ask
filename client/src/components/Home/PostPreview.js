import React from "react";
import pic from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProfilePhoto from "../user/ProfilePhoto";
function PostPreview(props){
    let currentDate = new Date();
    let postCreatedDate = new Date(props.date);

    let timeDiff = currentDate.getTime() - postCreatedDate.getTime();
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);

    let displayElapsedDate = "";

    if (timeDiff < 60){
        displayElapsedDate = "recent"
    } else if ( timeDiff < 3600 && timeDiff > 60) {
        displayElapsedDate = Math.round(timeDiff / 60) + "m ago";
    } else if (timeDiff < 86400 && timeDiff > 3600){
        displayElapsedDate = Math.round((timeDiff / 60) /60) + "hr ago"
    } else {
        displayElapsedDate = postCreatedDate.toDateString()
    }

    //if timeDiff < 60000 show "recent"
    //if 3,600,000 > timeDiff > 60000 "(timeDiff /= 1000) / 60  minutes ago"
    //if  86,400,000 > timeDiff > 3,600,000 "(timeDiff /= 1000) / 60 / 60 hr ago" 
    //if timeDiff > 86,400,000 display postCreatedDate

    console.log(postCreatedDate.toDateString());
    console.log(timeDiff);
    console.log(seconds);
    return (
    <div class="p-4 shadow-sm post-preview rounded border mx-auto container-fluid">
        <div class="user row">
            <div class="col-2 px-4">
                <ProfilePhoto userId={props.userId} />
            </div>
            <div class="col-10">
                <h5>{props.user}</h5>
                <h6 class="text-muted time">{displayElapsedDate}</h6>

            </div>
        </div>
        <div class="question-preview mt-4">
            <h4>{props.title}</h4>
            <p>{props.body} </p>
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
                    <a class="icon-button" href="/post"><FontAwesomeIcon icon={regular("comment")} /></a>
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