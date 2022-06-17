import React from "react";
import pic from "../img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avatar from "../user/Avatar";
function CommentSection() {
    //Comment
    //Comment input
    return (
        <div>
            <div class="comment-section shadow-sm">
                <div class="comment-input content-fluid row border gx-0 p-4">
                    <div class="col-2 px-3 py-2">
                        <Avatar picture={pic}/>
                    </div>
                    <div class="col-8 p-3">
                        <input
                            type="text"
                            placeholder="type your comment here"
                            class="form-control"
                        />
                    </div>
                    <div class="col-2">
                        <div class="send-icon text-center mt-4">
                            <FontAwesomeIcon icon={solid("paper-plane")} />
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default CommentSection;