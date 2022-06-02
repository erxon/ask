import axios from "axios";

const signin = async (user) => {
    try {
        let response = await axios({
            method: "post",
            url: "http://localhost:5000/auth/signin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true,
            data: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const signout = async () => {
    try{
        let response = await axios({
          method: "get",
          url: "http://localhost:5000/auth/signout"  
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export { signin, signout };