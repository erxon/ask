import axios from "axios";

const localhost = 'http://localhost:5000';

const questions = async () => {
    try{
        let response = await axios({
            method: 'get',
            url: localhost + '/api/questions'
        });
        return response;
    } catch (err){
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

export {
    questions,
    postQuestion
}