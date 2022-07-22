import React from "react";
import UserDetails from "./UserDetails";
import mark from "../img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function Answer(props) {
    return (
        <div class="border shadow-sm">
            <div class="mt-3 ms-3">
                <UserDetails
                    userId={props.answer.user}
                    jwt={props.jwt} />
            </div>
            <div class="answer-content">
                <h4>{props.answer.answerTitle}</h4>
                <p>{props.answer.answerBody}</p>
            </div>
            <div class="answer-icons">
                <div class="like-button d-inline me-3">
                    <a href="#"><FontAwesomeIcon icon={regular("thumbs-up")} /></a>
                    <p class="d-inline text-muted ms-1">24</p>
                </div>
                <div class="comment-button d-inline me-3">
                    <a href="#"><FontAwesomeIcon icon={regular("comment")} /></a>
                    <p class="d-inline text-muted ms-1">24</p>
                </div>

            </div>
        </div>
    );
}

export default Answer;