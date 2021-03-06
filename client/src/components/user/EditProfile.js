import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import auth from "../auth/auth-helper";
import {read, update} from "./api-user";
import { useParams, Navigate } from "react-router-dom";
import ProfilePhoto from "./ProfilePhoto";

function EditProfile() {
    //State object
    const [values, setValues] = useState({
        name: "",
        about: "",
        photoContentType: "",
        password: "",
        email: "",
        error:"",
        redirectToProfile: false,
        id: ""
    });

    //Check if user is authenticated
    const jwt = auth.isAuthenticated();

    //Get userId from url param
    const {userId} = useParams();

    //Get request to the server using useEffect
    useEffect(() => {
        read({userId}, {t: jwt.token}).then((response) => {
            const data = response.data;
            console.log(data);
            if(data && data.error){
                setValues({...values, error: data.error});
            } else{
                console.log(data.photo);
                setValues({
                    ...values, 
                    id: data._id, 
                    name: data.name, 
                    email: data.email, 
                    about: data.about
                });

            }
        });
    }, [userId]);



    //Handle changes from the input fields
    const handleSubmit = (event) => {
        event.preventDefault();
        //Instantiate FormData object
        let userData = new FormData();
        console.log(values);

        //Save key value pairs in the userData object
        values.name && userData.append("name", values.name);
        values.email && userData.append("email", values.email);
        values.password && userData.append("password", values.password);
        values.about && userData.append("about", values.about);
        values.photo && userData.append("photo", values.photo);
        
        //PUT request to the server
        update({userId: values.id}, {t: jwt.token}, userData).then((response) => {
            console.log("This is Update function")
            const data = response;
            console.log(response);
            
            if(data && data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, redirectToProfile: true});
            }
        }).catch(err => console.log(err));
    }
    
    const handleChange = name => event => {
        const value = name === "photo" ? 
        event.target.files[0] : event.target.value;
        setValues({...values, [name]: value});
    }
    // GET user's profile photo
    // const photoUrl = values.id ? `/api/users/photo/${values.id}?${new Date().getTime()}` : '/api/users/defaultPhoto';
    // console.log(photoUrl);
    
    console.log(values);
    if(values.redirectToProfile){
        return( <Navigate to={"/user/"+values.id} /> );
    }
    return (
        <div>
            <Navbar active="profile" />
            <div>
                {/*Display image*/}
                <div className="text-center mt-3">
                    <ProfilePhoto 
                        userId={userId}
                        customStyle={{width: "100px", height: "100px"}}
                    />
                </div>
                
                <div className="text-center mt-3">
                    <input
                        accept="image/*"
                        type="file"
                        name="photo"
                        onChange={handleChange("photo")}
                    />
                    
                    

                </div>

                <div className="mx-auto p-3 w-50">
                    <div className="mt-3">
                        <label for="name" className="form-label">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange("name")}
                            value={values.name} />

                    </div>

                    <div className="mt-3">
                        <label for="email" className="form-label">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange("email")}
                            value={values.email} />
                    </div>

                    <div className="mt-3">
                        <label for="about" className="form-label">About me</label>
                        <textarea
                            className="form-control"
                            id="about"
                            name="about"
                            onChange={handleChange("about")}
                            value={values.about} />
                    </div>
                    <label htmlFor="password" className="form-label mt-3">Password</label>
                    <input type="password" onChange={handleChange("password")} className="form-control" placeholder="New password" />
                </div>
                <button className="d-block mx-auto mt-4 btn btn-dark" onClick={handleSubmit}>Save</button>

            </div>


        </div>
    );
}

export default EditProfile;