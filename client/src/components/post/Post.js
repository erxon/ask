import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProfilePhoto from "../user/ProfilePhoto";
import {vote, unvote} from "../Home/api-question";
import auth from "../auth/auth-helper";
import { displayElapsedTime } from "../helpers/displayElapsedTime";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Post(props) {
    const checkVote = (votes) => {
        let match = votes.indexOf(props.credentials.user._id) !== -1;
        return match;
    }
    
    const [values, setValues] = useState({
        vote: checkVote(props.post.usersVoted),
        votes: props.post.usersVoted.length
    });

    

    const clickVote = () => {
        let callApi = values.vote ? unvote : vote;
        const jwt = auth.isAuthenticated();
        callApi({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.post._id).then((response) => {
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
        <div>
            <div class="user row">
                <div class="col-2 px-4">
                    {props.post.user._id && <ProfilePhoto userId={props.post.user._id} /> }
                </div>
                <div class="col-10">
                    <h5>{props.post.user.name}</h5>
                    <h6 class="text-muted time">{displayElapsedTime(props.post.created)}</h6>
                </div>
            </div>
            <div class="question-preview mt-4">
                <h4>{props.post.questionTitle}</h4>
                <p>{props.post.questionBody}</p>
            </div>

            <div class="icon-buttons">
                <div class="like-button d-inline me-3">
                    <div class="icon d-inline">
                        <a class="icon-button btn btn-link" onClick={clickVote}>
                            { values.vote ? <ThumbUpIcon sx={{color: "#F66B0E"}} /> : <ThumbUpOutlinedIcon /> }
                        </a>
                    </div>
                    <p class="d-inline text-muted ms-1">{values.votes}</p>
                </div>
                <div class="comment-button d-inline me-3">
                    <div class="icon d-inline">
                        <a class="icon-button" href="#"><FontAwesomeIcon icon={regular("comment")} /></a>
                    </div>
                    <p class="d-inline text-muted ms-1">12</p>
                </div>
                <div class="answer-button d-inline">
                    <div class="icon d-inline">
                        <a class="icon-button" href="#"><FontAwesomeIcon icon={regular("pen-to-square")} /></a>
                    </div>
                    <p class="d-inline text-muted ms-1">1</p>
                </div>
            </div>
        </div>
    )

}

export default Post;