import React, { useEffect, useState } from "react";
import pic from "../img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import {useParams} from "react-router-dom";
import {postQuestion} from "./api-question";
import ProfilePhoto from "../user/ProfilePhoto";


function QuestionInput(props) {
    //create a state object question: questionTitle, questionContent
    //handleChange - to handle changes in the input fields
    //handleSubmit - save the question object to the database
    const [values, setValues] = useState({
        questionTitle: "",
        questionBody: "",
        response: "",
        userId: "",
        refresh: false
    });

    const {userId} = useParams();

    const handleChange = (event) => {
        const {name, value} = event.target;

        setValues((prevValue) => {return {...prevValue, [name]: value}});
    }

    const handleSubmit = () => {
        const question = {
            questionTitle: values.questionTitle,
            questionBody: values.questionBody,
            userId: userId
        }
        postQuestion(question, {t: props.token})
        .then((response) => {
            setValues({...values, response: response.data.message});
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div class="question-input row rounded p-4 shadow-sm border mx-auto container-fluid">
            <div class="col-2">
                <ProfilePhoto userId={userId} />
            </div>
            
            <div class="col-10">
                <input
                    type="text"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    class="form-control my-2"
                    placeholder="what do you want to know about?"
                />
            </div>
            
            <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style={{backgroundColor: "#205375", color: "#fff"}}>
                            <FontAwesomeIcon icon={solid("circle-question")} />
                            <h5 class="modal-title me-auto ms-2" id="exampleModalLabel">Ask</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <input 
                                    type="text" 
                                    name="questionTitle" 
                                    placeholder="Question" 
                                    class="form-control w-75 ms-2" 
                                    onChange={handleChange}
                                    value={values.questionTitle}
                                />
                            </div>
                            <textarea 
                                type="text" 
                                name="questionBody" 
                                placeholder="Description" 
                                class="form-control mt-3" 
                                onChange={handleChange}
                                value={values.questionBody}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-dark me-auto" onClick={handleSubmit}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionInput;