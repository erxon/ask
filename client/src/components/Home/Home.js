import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";
import auth from "../auth/auth-helper";
import { Navigate, useParams } from "react-router-dom";
import {questions} from "./api-question";
import {read} from "../user/api-user";

function Home() {
    //List questions
    //(done)State object that will contain question title, content and the user who posted it
    //(done) Get request to the server for the question list
        //Map each question details to the values array
    //Get request to the server for the user information 
    //Map the list of questions to the PostPreview
    //In the PostPreview, limit the post content into 300 characters
    //In the PostPreview, show the user's profile photo using ProfilePhoto component

    //Make the home component a public route
    //If the user is not yet authenticated, display in the navbar the sign in or sign up button
    //Link the sign in or sign up button to the "/" path

    const credentials = auth.isAuthenticated();
    const {userId} = useParams();

    const [values, setValues] = useState([{
        questionTitle: "",
        questionBody: "",
        user: "",
        datePosted: ""
    }]);
    //Listing questions
    useEffect(() => {
        questions().then(response => {
            const data = response.data;
            console.log(data);
            let questions = data.map((question) => {
                return {
                    questionTitle: question.questionTitle,
                    questionBody: question.questionBody,
                    datePosted: question.created
                }
            });
            setValues(questions);
            console.log(values);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    //Get request to the server for the user info
    // useEffect(() => {
    //     //require read in api-user
    //     //call read function
    //     read({userId: userId}, {t: credentials.token})
    //     .then((response) => {
    //         const data = response.data;

    //         setValues({...values, userName: data.name});

    //         console.log(values);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, []);


    if (!credentials) {
        return (<Navigate to={"/"} />);
    }


    
    return (
        <div>
            <Navbar active="home" />
            <div>
                <div>
                    <div class="m-4">
                        <QuestionInput token={credentials.token} />
                    </div>
                    <div class="post">
                        <PostPreview />
                    </div>
                </div>
                {/* <div class="col-lg-4 users-section">
                        <Users />
                    </div> */}
            </div>
            {/* <div class="collapse" id="usersCollapse">
                    <Users />
                </div> */}
        </div>
    );
}


export default Home;