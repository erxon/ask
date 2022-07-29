import React, {useEffect, useState} from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";
import {questions} from "../Home/api-question";
import {listAnswers} from "../answers/api-answer";

function PostedAnswers(props){
    //import api to retrieve question and answer
    //Call useEffect twice - retrieve questions and answers posted by the user
    //Create a State to store values
    //Information to retrieve: title, content, date created, post id, post tag (question or answer)
    const [questionValues, setQuestions] = useState([]);
    const [answerValues, setAnswers] = useState({
        posts: [],
        postTag: "answer"
    });

    useEffect(() => {

        questions().then(response => {
            
            setQuestions(response.data.filter(post => {
                return post.user === props.userId
            }));
            console.log(questionValues);
        }).catch(err => {
            console.log(err);
        });

    }, []);

    return (
        <div>
        {/*Map questions and answers posted by the user*/
        }
            {
                questionValues.length > 0 ? questionValues.map((post) => {
                    <QuestionAndAnswer 
                        key={post._id}
                        postId={post._id}
                        postTitle={post.questionTitle} 
                        postContent={post.questionBody}  
                        postedAt={post.created}
                        postTag={"question"}
                    />
                }) : <p>Didn't posted any questions yet</p>
            }
            <QuestionAndAnswer />
        </div>
    );
}

export default PostedAnswers;