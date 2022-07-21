import React from "react";
import UserDetails from "./UserDetails";
import mark from "../img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function Answer() {
    return (
        <div class="border shadow-sm">
            <div class="mt-3 ms-3">
                {/* <UserDetails
                    photo={mark}
                    name="Mark Vonkovitch"
                    date="Nov 1, 2022" /> */}
            </div>
            <div class="answer-content">
                <h4>Answer title</h4>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
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