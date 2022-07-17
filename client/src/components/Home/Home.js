import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";
import auth from "../auth/auth-helper";
import { Navigate, useParams } from "react-router-dom";
import {questions} from "./api-question";
function Home() {
    //List questions

    //
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
            console.log(data);
            data.reverse();
            setValues([...data]);
        })
    }, []);


    if (userId === "undefined" && !credentials) {
        return (<Navigate to={"/"} />);
    }


    
    return (
        <div>
            <div>
            <Navbar userId={userId}/>
                <div>
                    <div class="m-4">
                        <QuestionInput token={credentials.token} />
                    </div>
                    <div class="post">
                        {
                            values.map((question) => {
                              return (
                                <PostPreview
                                    key={question._id}
                                    question={question}
                                    credentials={credentials}
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