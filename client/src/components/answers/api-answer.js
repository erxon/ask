import axios from "axios";

const localhost = 'http://localhost:5000';


const answer = async (params) => {
    try{
        let response = await axios({
            method: "get",
            url: localhost + `/api/answers/${params.answerId}`
        });
        return response;
    } catch (err){
        console.log(err);
    }
}

const listAnswers = async (params) => {
    try{
        let response = await axios({
            method: "get",
            url: localhost + `/api/answers/list/${params.questionId}`
        });
        return response;
    } catch (err){
        console.log(err);
    }
}

const submitAnswer = async (params, credentials) => {
    try{
        let response = await axios({
           method: "post",
           url:  localhost + "/api/answers",
           headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify(
                {
                    answerTitle: params.answerTitle, 
                    answerBody: params.answerBody,
                    user: params.user,
                    questionId: params.questionId
                })
        });
        return response
    } catch(err){
        console.log(err);
    }
}

const vote = async (params, credentials, answerId) => {
    try{
        let response = await axios({
            method: 'put',
            url: localhost + "/api/answers/vote",
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify({userId: params.userId, answerId: answerId})
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

const unvote = async (params, credentials, answerId) => {
    try{
        let response = await axios({
            method: 'put',
            url: localhost + '/api/answers/unvote',
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            data: JSON.stringify({userId: params.userId, answerId: answerId})
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

export {
    answer,
    listAnswers,
    submitAnswer,
    vote,
    unvote
}