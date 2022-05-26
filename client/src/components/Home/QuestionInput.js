import React from "react";
import pic from "../img/1.jpg";

function QuestionInput() {
    return (
        <div class="question-input row">
            <img class="avatar col-4 p-0" src={pic} />
            <input
                type="text"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                class="w-75 ms-3 form-control col-8"
                placeholder="what do you want to know about?"
            />
            <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ask</h5>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <img class="avatar col-4 p-0 ms-4" src={pic} />
                                <input 
                                    type="text" 
                                    name="questionTitle" 
                                    placeholder="Question" 
                                    class="form-control col-8 w-75 ms-4" 
                                />
                            </div>
                            <textarea 
                                type="text" 
                                name="questionContent" 
                                placeholder="Description" 
                                class="form-control mt-3" 
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark me-auto">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionInput;