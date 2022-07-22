import axios from "axios";

const localhost = 'http://localhost:5000';

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

export {
    listAnswers,
    submitAnswer
}