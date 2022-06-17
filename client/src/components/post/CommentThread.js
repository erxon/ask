import React from "react";
import Comment from "./Comment";
import sherlock from "../img/2.jpg";
import mary from "../img/3.jpg";
import irene from "../img/4.jpg";

function CommentThread(){
    let comments = [
        {
            picture: sherlock,
            name: "Sherlock Holmes",
            timeAgo: "1m",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            numOfLikes: 40,
            numOfReplies: 10
        },
        {
            picture: mary,
            name: "Mary Sutherland",
            timeAgo: "1m",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            numOfLikes: 40,
            numOfReplies: 10
        },
        {
            picture: irene,
            name: "Irene Adler",
            timeAgo: "1m",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            numOfLikes: 40,
            numOfReplies: 10
        }
    ];

    return(
        <div class="comment-thread mx-auto">
            {comments.map(comment => {
                return <Comment 
                    picture={comment.picture}
                    name={comment.name}
                    timeAgo={comment.timeAgo}
                    comment={comment.content}
                    numOfLikes={comment.numOfLikes}
                    numOfReplies={comment.numOfReplies}
                />
            })}
        </div>
    );
}

export default CommentThread;