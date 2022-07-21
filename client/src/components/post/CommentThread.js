import React, {useEffect, useState} from "react";
import Comment from "./Comment";
import {listComments} from "../Home/api-question";
function CommentThread(props){
    //GET request for comments "/api/comments"
    //Create a state array to store comments
    const [values, setValues] = useState([]);
    //Filter the comments - only display the comments with the given postId
    //Map the comments in the view
    useEffect(() => {
        listComments().then(response => {
            console.log(response);
            setValues(
                response.data.filter(comment => {
                    return comment.postId === props.postId
                }));

        }).catch(err => {
            console.log(err);
        });
    }, []);

    return(
        <div class="comment-thread mx-auto">
            {values && values.map(comment => {
                return <Comment 
                    key={comment.userId}
                    userId={comment.userId}
                    userName={comment.userName}
                    created={comment.created}
                    content={comment.content}
                />
            })}
        </div>
    );
}

export default CommentThread;