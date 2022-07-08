import React, {useState} from "react";
import {create} from "../user/api-user";
import {signin} from "../auth/api-auth";
import auth from "../auth/auth-helper";
import { Navigate } from "react-router-dom";

export default function LoginAndSignup(){
    const [id, setId] = useState("");
    const [loginInput, fillLoginInput] = useState({
        email: "",
        password: "",
        error: "",
        redirectToHome: false
    });
    const [signupInput, fillSignupInput] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        redirectToEditProfile: false
    });

    //Login
    /**********************************************/
    const handleLoginInput = (event) => {
        const {name, value} = event.target;

        fillLoginInput((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: loginInput.email,
            password: loginInput.password
        };

        signin(user).then((response) => {
            const data = response.data
            if(data.error) {
                fillLoginInput({...loginInput, error: data.error});
            } else {
                auth.authenticate(data, () => {
                    fillLoginInput({...loginInput, error: "", redirectToHome: true});
                    setId(data.user._id);
                });

                

            }
            
        }).catch(err => console.log(err));
        
    };
   

    //Signup
    /**********************************************/

    const handleSignupInput  = (event) => {
        const {name, value} = event.target;

        fillSignupInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };
    
    const handleSignupSubmit = () => {
        const user = {
            name: signupInput.name,
            email: signupInput.email,
            password: signupInput.password
        }
        create(user).then(response => {
            console.log(response);
            signin({email: user.email, password: user.password}).then((response) => {
                const data = response.data
                if(data.error) {
                    fillSignupInput({...signupInput, error: data.error});
                } else {
                    auth.authenticate(data, () => {
                        fillSignupInput({...signupInput, error: "", redirectToEditProfile: true});
                        setId(data.user._id);
                    });
                }
                
            }).catch(err => console.log(err));
        }).catch(err => {
            console.log(err);
        });
    };
    if(loginInput.redirectToHome){
        return (<Navigate to={"/home/"+id} />);
    }
    if(signupInput.redirectToEditProfile){
        return (<Navigate to={"/user/edit/"+id} />);
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