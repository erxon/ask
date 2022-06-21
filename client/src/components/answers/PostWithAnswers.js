import React from "react";
import Navbar from "../Home/Navbar";
import UserDetails from "./UserDetails";
import Question from "./Question";
import mark from "../img/1.jpg";
import Avatar from "../user/Avatar";
import Answer from "./Answer";
import sherlock from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function PostWithAnswers() {
    return (
        <div>
            <Navbar />
            <div class="row gx-0">
                <div class="post col-lg-6 col-md-12"> 
                    <div>
                        <UserDetails 
                            photo={sherlock} 
                            name="Sherlock Holmes" 
                            date="Nov 4, 2022"/>
                    </div>
                    <div>
                        <Question />
                    </div>
                    <div class="answer-input mt-3">
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
                </div>
                <div class="col-lg-6 col-md-12 answers">
                    <div class="answers-heading">
                        <h3>Answers</h3>
                    </div>
                    <div class="answer-thread">
                        <Answer />
                        <Answer />
                        <Answer />
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
                                    class="form-control col-10 w-75 mx-auto" 
                                    placeholder="your answer"/>
                            </div>
                            
                            <textarea 
                                type="text"
                                class="form-control mt-3"
                                placeholder="description"
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary me-auto">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostWithAnswers;