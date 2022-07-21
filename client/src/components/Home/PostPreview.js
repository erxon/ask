import React, {useEffect, useState} from "react";
import pic from "../img/2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProfilePhoto from "../user/ProfilePhoto";
import {vote, unvote} from './api-question';
import auth from "../auth/auth-helper";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import {listComments} from "./api-question";
function PostPreview(props){
    //read likes

    //if like is clicked add user id in the usersVoted
    //if user's id already exists in the usersVoted, remove it 
    //display the usersVoted length

    //Get request for the list of comments in comments api
    //render comments.length
    const [comments, setComments] = useState([]);
    useEffect(() => {
        listComments().then(response => {
            setComments(
                response.data.filter(comment => {
                    return comment.postId === props.question._id
                }));

        }).catch(err => {
            console.log(err);
        });
    }, []);

    
    let currentDate = new Date();
    let postCreatedDate = new Date(props.question.created);

    let timeDiff = currentDate.getTime() - postCreatedDate.getTime();
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);

    let displayElapsedDate = "";

    if (timeDiff < 60){
        displayElapsedDate = "recent"
    } else if ( timeDiff < 3600 && timeDiff > 60) {
        displayElapsedDate = Math.round(timeDiff / 60) + "m ago";
    } else if (timeDiff < 86400 && timeDiff > 3600){
        displayElapsedDate = Math.round((timeDiff / 60) /60) + "hr ago"
    } else {
        displayElapsedDate = postCreatedDate.toDateString()
    }

    //if timeDiff < 60000 show "recent"
    //if 3,600,000 > timeDiff > 60000 "(timeDiff /= 1000) / 60  minutes ago"
    //if  86,400,000 > timeDiff > 3,600,000 "(timeDiff /= 1000) / 60 / 60 hr ago" 
    //if timeDiff > 86,400,000 display postCreatedDate

    // console.log(postCreatedDate.toDateString());
    // console.log(timeDiff);
    // console.log(seconds);

    const checkVote = (votes) => {
        let match = votes.indexOf(props.credentials.user._id) !== -1;
        return match;
    }

    const [values, setValues] = useState({
        vote: checkVote(props.question.usersVoted),
        votes: props.question.usersVoted.length
    });

    // const handleLike = () => {
    //     const data = {
    //         questionId: props.questionId,
    //         userId: props.userId
    //     }
    //     if(!props.usersVoted.includes(props.userId)){
    //         vote(data, {t: props.token}).then(response => {
    //             console.log(response);
    //             console.log(props.usersVoted);
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     } else {
    //         unvote(data, {t: props.token}).then(response => {
    //             console.log(response);
    //             console.log(props.usersVoted);
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }

    const clickLike = () => {
        let callApi = values.vote ? unvote : vote;
        const jwt = auth.isAuthenticated();
        callApi({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.question._id).then((response) => {
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
    <div class="p-4 shadow-sm post-preview rounded border mx-auto container-fluid">
        <div class="user row">
            <div class="col-2 px-4">
                <ProfilePhoto userId={props.question.user} />
            </div>
            <div class="col-10">
                <h5>{props.question.userName}</h5>
                <h6 class="text-muted time">{displayElapsedDate}</h6>
            </div>
        </div>
        <div class="question-preview mt-4">
            <h4>{props.question.questionTitle}</h4>
            <p>{props.question.questionBody.length >= 300 ? 
            props.question.questionBody.substring(0, 300) + "..." : props.question.questionBody} </p>
        </div>

        <div class="icon-buttons">
            <div class="like-button d-inline me-3">
                <div class="icon d-inline">
                    <a class="icon-button btn btn-link" onClick={clickLike}>
                        { values.vote ? <ThumbUpIcon sx={{color: "#F66B0E"}} /> : <ThumbUpOutlinedIcon /> }
                    </a>
                </div>
                <p class="d-inline text-muted ms-1">{values.votes}</p>
            </div>
            <div class="comment-button d-inline me-3">
                <div class="icon d-inline">
                    <a class="icon-button btn btn-link" href={"/post/"+props.question._id}>
                        <CommentOutlinedIcon />
                    </a>
                </div>
                <p class="d-inline text-muted ms-1">{comments && comments.length}</p>
            </div>
            <div class="answer-button d-inline">
                <div class="icon d-inline">
                    <a class="icon-button" href="#">
                        <QuestionAnswerOutlinedIcon />
                    </a>
                </div>
                <p class="d-inline text-muted ms-1">1</p>
            </div>
        </div>
    </div>
    );
}

export default PostPreview;