import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import UserDetails from "./UserDetails";
import Question from "./Question";
import mark from "../img/1.jpg";
import Avatar from "../user/Avatar";
import Answer from "./Answer";
import sherlock from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import auth from "../auth/auth-helper";
import {question} from "../Home/api-question";
import { useParams } from "react-router-dom";
import {listAnswers, submitAnswer} from "./api-answer";

function PostWithAnswers() {
    //Submitting answers
    //1. Create state constant to handle values
    const jwt = auth.isAuthenticated();
    const {questionId} = useParams();
    const [answer, setAnswer] = useState({
        title: "",
        content: "",
        user: jwt.user._id,
        questionId: questionId
    });
    //2. Create a handleChange function
    const handleChange = (event) => {
        const {value, name} = event.target;
        setAnswer({...answer, [name]: value});
    }
    //3. Create a handleSubmit function
    const handleSubmit = () => {
        const data = {
            answerTitle: answer.title,
            answerBody: answer.content,
            user: answer.user,
            questionId: answer.questionId
        }
        submitAnswer(data, {t: jwt.token})
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });

    }
    

     
    const [values, setValues] = useState({
       user: {},
       title: "",
       content: ""
    });

    

    
    useEffect(() => {
        question({questionId: questionId}, {t: jwt.token})
        .then(response => {
            setValues({
                ...values,
                user: response.data.user,
                title: response.data.questionTitle,
                content: response.data.questionBody
            });
        }).catch(err => {
            console.log(err);
        });
    }, []);

    //3. Map all the data in the Answer component

    const [answers, setAnswers] = useState([]);
    
    useEffect(() => {
        listAnswers({questionId: questionId}).then(response => {
            console.log(response.data)
            setAnswers([...response.data]);
        }).catch(err => {
            console.log(err)
            alert("no answers yet");
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div class="row gx-0">
                <div class="post col-lg-6 col-md-12"> 
                    <div>
                        {Object.keys(values.user).length !== 0 && <UserDetails 
                            userId={values.user._id} 
                            name={values.user.name} 
                            jwt={jwt} 
                            />}
                    </div>
                    <div>
                        <Question title={values.title} content={values.content} />
                    </div>
                    
                </div>
                <div class="col-lg-6 col-md-12 answers">
                    <div class="answer-input mt-3 mb-3">
                        <div class="row gx-0 container-fluid">
                            <div class="col-2">
                                <div class="ms-2">
                                    <Avatar picture={mark} />
                                </div>
                            </div>
                            <input
                                type="text"
                                class="answer-field form-control col-10"
                                placeholder="Write your answer"
                                data-bs-toggle="modal"
                                data-bs-target="#answeringModal" />
                        </div>
                        
                    </div>
                    <div class="answers-heading">
                        <h3>Answers</h3>
                    </div>
                    <div class="answer-thread">
                        {
                            answers && answers.map(answer => {
                                return <Answer key={answer._id} answer={answer} jwt={jwt} />
                            })
                        }
                    </div>
                    
                </div>
            </div>
            
            
            
            {/*Modal*/}
            <div class="modal fade" id="answeringModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="answeringModal"> <FontAwesomeIcon icon={regular("pen-to-square")}/> Answer</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row gx-0">
                                <div class="col-2">
                                    <div class="ms-3">
                                        <Avatar picture={mark}/>
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    name="title"
                                    value={answer.title}
                                    onChange={handleChange}
                                    class="form-control col-10 w-75 mx-auto" 
                                    placeholder="your answer"/>
                            </div>
                            
                            <textarea 
                                type="text"
                                name="content"
                                value={answer.body}
                                onChange={handleChange}
                                class="form-control mt-3"
                                placeholder="description"
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary me-auto" onClick={handleSubmit}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostWithAnswers;