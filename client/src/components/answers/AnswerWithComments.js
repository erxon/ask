import React from "react";
import Answer from "./Answer";
import Navbar from "../Home/Navbar";
import CommentSection from "../post/CommentSection";
import CommentThread from "../post/CommentThread";

function AnswerWithComments(){
    return(
        <div>
            <Navbar />
            <div class="single-answer mx-auto mt-4">
                <Answer />
            </div>
            <div>
                <CommentThread />
            </div>
            <div>
                <CommentSection />
            </div>
        </div>
    );
}

export default AnswerWithComments;