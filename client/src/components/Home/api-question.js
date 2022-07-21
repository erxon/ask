import axios from "axios";

const localhost = 'http://localhost:5000';

const questions = async () => {
    try{
        let response = await axios({
            method: "get",
            url: localhost + "/api/questions"
        });
        return response;
    } catch (err){
        console.log(err);
    }
}

const question = async (params, credentials) => {
    //read question
    //"/api/questions/:questionId"
    try{
        let response = await axios({
            method: "get",
            url: localhost + "/api/questions/" + params.questionId,
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            }
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}

const postQuestion = async (data, credentials) => {
    try {
        let response = await axios({
            method: 'post',
            url: localhost + '/api/questions',
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify(data)
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}
const vote = async (params, credentials, questionId) => {
    try{
        let response = await axios({
            method: 'put',
            url: localhost + '/api/questions/vote',
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify({userId: params.userId, questionId: questionId})
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

const unvote = async (params, credentials, questionId) => {
    try{
        let response = await axios({
            method: 'put',
            url: localhost + '/api/questions/unvote',
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify({userId: params.userId, questionId: questionId})
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

const comment = async (params, credentials) => {
    try{
        let response = await axios({
            method: 'post',
            url: localhost + '/api/comments',
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify({
                postId: params.postId, 
                userId: params.userId,
                userName: params.userName, 
                content: params.content})
        })
        return response
    } catch(err) {
        console.log(err);
    }
}

const listComments = async () => {
    try{
        let response = await axios({
            method: 'get',
            url: localhost + '/api/comments'
        });
        return response;
    } catch (err){
        console.log(err);
    }
}
export {
    questions,
    postQuestion,
    vote,
    unvote,
    question,
    comment,
    listComments
}