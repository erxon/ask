import React, {useState, useEffect} from "react";
import UserDetails from "./UserDetails";
import mark from "../img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { vote, unvote } from "./api-answer";
import auth from "../auth/auth-helper";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {listComments} from "../Home/api-question";
function Answer(props) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        listComments().then(response => {
            setComments(
                response.data.filter(comment => {
                    return comment.postId === props.answer._id
                }));

        }).catch(err => {
            console.log(err);
        });
    }, []);

    const checkVote = (votes) => {
        let match = votes.indexOf(props.jwt.user._id) !== -1;
        return match;
    }

    const [values, setValues] = useState({
        vote: checkVote(props.answer.usersVoted),
        votes: props.answer.usersVoted.length
    });

    const clickVote = () => {
        let callApi = values.vote ? unvote : vote;
        const jwt = auth.isAuthenticated();
        callApi({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.answer._id).then((response) => {
            if(response.data.error){
                console.log(response.data.error)
            } else {
                setValues({...values, vote: !values.vote, 
                    votes: response.data.usersVoted.length
                });
            }
        })
    }


    return (
        <div class="border shadow-sm">
            <div class="mt-3 ms-3">
                <UserDetails
                    userId={typeof(props.answer.user) !== "object" ? props.answer.user : props.answer.user._id}
                    jwt={props.jwt} />
            </div>
            <div class="answer-content">
                <h4>{props.answer.answerTitle}</h4>
                <p>{props.answer.answerBody}</p>
            </div>
            <div class="answer-icons">
                <div class="like-button d-inline me-3">
                    <a className="icon-button btn btn-link" onClick={clickVote}>
                        { values.vote ? <ThumbUpIcon sx={{color: "#F66B0E"}} /> : <ThumbUpOutlinedIcon /> }
                    </a>
                    <p class="d-inline text-muted ms-1">{values.votes}</p>
                </div>
                <div class="comment-button d-inline me-3">
                    <a class="icon-button btn btn-link" href={"/post/answers/comments/"+props.answer._id}>
                        <CommentOutlinedIcon />
                    </a>
                    <p class="d-inline text-muted ms-1">{comments && comments.length}</p>
                </div>

            </div>
        </div>
    );
}

export default Answer;