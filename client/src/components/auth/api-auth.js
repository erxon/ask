import axios from "axios";

const signin = async (user) => {
  try {
    let response = await axios({
      method: "post",
      url: "http://localhost:5000/auth/signin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const signout = async () => {
  try {
    let response = await axios({
      method: "get",
      url: "http://localhost:5000/auth/signout",
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export { signin, signout };
