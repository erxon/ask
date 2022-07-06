import axios from "axios";

const create = async (user) => {
    try {
        let response = await axios({
            method: "post",
            url: "http://localhost:5000/api/users",
            headers: {
                "Accept": "appication/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(user)
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}

const list = async () => {
    try {
        let response = await axios({
            method: "get",
            url: "http://localhost:5000/api/users"
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const read = async (params, credentials) => {
    try {
        let response = await axios({
            method: "get",
            url: "http://localhost:5000/api/users/" + params.userId,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            }
        })
        return response;
    } catch (err) {
        console.log(err);
    }
}

const update = async (params, credentials, user) => {
    try {
        let response = await axios({
            method: "put",
            url: "http://localhost:5000/api/users/" + params.userId,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + credentials.t
            },
            data: user
        })
        return response;
    } catch (err) {
        console.log(err);
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await axios({
            method: "delete",
            url: "http://localhost:5000/api/users/" + params.userId,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            }
        })
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export {
    create,
    list,
    read,
    update,
    remove
};