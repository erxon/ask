import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import CommentSection from "./CommentSection";
import CommentThread from "./CommentThread";
import Post from "./Post";
import auth from "../auth/auth-helper";
import { useParams } from "react-router-dom";
import { question } from "../Home/api-question";
import { isNull } from "lodash";

function PostDetailed() {
    const { questionId } = useParams();
    const jwt = auth.isAuthenticated();
    const [post, setPost] = useState({});

    //Retrieve the single question
    useEffect(() => {
        question({questionId: questionId}, {t: jwt.token})
        .then(response => {
            const data = response.data;
            console.log(data);
            setPost({...data});
            
        }).catch(err => {
            console.log(err);
        })
    }, []);


    return (
        <div>
            <Navbar />
            <div class="p-4 shadow-sm post-detailed rounded border mx-auto container-fluid">
                { Object.keys(post).length !== 0  && <Post 
                    post={post}
                    credentials={jwt}
                />}
            </div>
            <CommentThread />
            <CommentSection />
        </div>
    );
}

export default PostDetailed;