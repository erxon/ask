import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";
import auth from "../auth/auth-helper";
import { Navigate, useParams } from "react-router-dom";
import {questions} from "./api-question";

function Home() {
    //List questions
    //(done)State object that will contain question title, content and the user who posted it
    //(done) Get request to the server for the question list
        //Map each question details to the values array
    //Map the list of questions to the PostPreview
    //In the PostPreview, limit the post content into 300 characters
    //In the PostPreview, show the user's profile photo using ProfilePhoto component

    //Make the home component a public route
    //If the user is not yet authenticated, display in the navbar the sign in or sign up button
    //Link the sign in or sign up button to the "/" path

    const credentials = auth.isAuthenticated();
    const {userId} = useParams();
    
    const [values, setValues] = useState([]);
    //Listing questions
    useEffect(() => {
        questions()
        .then((response) => {
            let data = response.data;
            data.reverse();
            setValues([...data]);
        })
    }, []);
    console.log(values);
    if (!credentials) {
        return (<Navigate to={"/"} />);
    }


    
    return (
        <div>
            <div>
                <div>
                    <div class="m-4">
                        <QuestionInput token={credentials.token} />
                    </div>
                    <div class="post">
                        {
                            values.map((question) => {
                              return (
                                <PostPreview
                                    key={question.postId}
                                    body={question.questionBody}
                                    title={question.questionTitle}
                                    user={question.userName}
                                    date={question.created}
                                    userId={userId}
                                    id={question.postId}
                                 />
                              )
                            })
                        }
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}


export default Home;