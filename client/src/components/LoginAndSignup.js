import React, {useState} from "react";
import axios from "axios";

export default function LoginAndSignup(){
    //State - loginInput fillLoginInput
    //loginInput should contain email and password
    //handleInput() - fillLoginInput with the input in the form using event
    //console log the state object

    //Login
    /**********************************************/
    const [loginInput, fillLoginInput] = useState({
        email: "",
        password: ""
    });
    const handleLoginInput = (event) => {
        const {name, value} = event.target;

        fillLoginInput((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        });
    }
    const handleLoginSubmit = () => {
        axios.post("http://localhost:5000/auth/signin", {
            email: loginInput.email,
            password: loginInput.password
        })
        .then((response) => {
            console.log(response);
            
            window.location = "/home";
        }).catch (err => {
            console.log(err);
            //error page
        })
    }
    //Signup
    /**********************************************/
    const [signupInput, fillSignupInput] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    const handleSignupInput  = (event) => {
        const {name, value} = event.target;

        fillSignupInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }
    
    const handleSignupSubmit = () => {
        axios.post("http://localhost:5000/api/users", {
            name: signupInput.name,
            email: signupInput.email,
            password: signupInput.password
        })
        .then((response) => {
            console.log(response);
            
        }).catch (err => {
            console.log(err);
            //error page

        })
    }

    
    
    return(
    <div style={{backgroundColor: "#205375", height: "50rem"}}>
        <h1 className="title">ASK</h1>
        <div className="login-signup container">
            <div class="row">
                <div class="login-signup-col col-lg-6 col-md-12">
                    <div className="heading">
                        <h2 className="login">Login</h2>
                    </div>
                    <div className="input-fields">
                        <input 
                            onChange={handleLoginInput} 
                            value={loginInput.email} 
                            name="email"
                            class="form-control" 
                            type="email" 
                            placeholder="Email" /><br />
                        <input 
                            onChange={handleLoginInput} 
                            value={loginInput.password}
                            name="password" 
                            class="form-control" 
                            type="password" 
                            placeholder="Password" />
                        <br />
                        <button onClick={handleLoginSubmit} type="button" class="btn btn-dark">Login</button>
                    </div>
                </div>
                <div class="login-signup-col col-lg-6 col-md-12">
                    <div className="heading">
                        <h2 className="signup">Signup</h2>
                    </div>
                    <div className="input-fields"> 
                        <input 
                            onChange={handleSignupInput}
                            value={signupInput.name} 
                            name="name"
                            class="form-control" 
                            type="text" 
                            placeholder="Name" /><br />
                        <input 
                            onChange={handleSignupInput} 
                            value={signupInput.email} 
                            name="email"
                            class="form-control" 
                            type="email" 
                            placeholder="Email" /><br />
                        <input 
                            onChange={handleSignupInput} 
                            value={signupInput.password} 
                            name="password"
                            class="form-control" 
                            type="password" 
                            placeholder="Password" />
                        <br />
                        <button onClick={handleSignupSubmit} type="button" class="btn btn-dark">Signup</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    );
}