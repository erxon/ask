import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import Navbar from "../Home/Navbar";
import CommentSection from "../post/CommentSection";
import CommentThread from "../post/CommentThread";
import { useParams } from "react-router-dom";
import {answer} from "./api-answer";
import auth from "../auth/auth-helper";

function AnswerWithComments(){
    const {answerId} = useParams();
    const jwt = auth.isAuthenticated();
    const [values, setValues] = useState({});
    useEffect(() => {
        answer({answerId: answerId}).then(response => {
            console.log(response.data);
            setValues({...response.data});
        }).catch(err => {
            console.log(err);
        })
    }, []);
    
    //3. Display comment section.
    return(
        <div>
            <Navbar />
            <div class="single-answer mx-auto mt-4">
                { Object.keys(values).length !== 0 && <Answer 
                    answer={values}
                    jwt={jwt}
                />}
            </div>
            <div>
                <CommentThread postId={answerId} />
            </div>
            <div>
                {Object.keys(values).length !== 0  && <CommentSection 
                userId={jwt.user._id} 
                postId={answerId}
                userName={values.user.name}

                />}
            </div>
        </div>
    );
}

export default AnswerWithComments;