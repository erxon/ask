import React, {useEffect, useState} from "react";
import { read } from "../user/api-user";
import ProfilePhoto from "../user/ProfilePhoto";

function UserDetails(props) {
    const [value, setValue] = useState({
        joined: ""
    });

    useEffect(() => {
        read({userId: props.userId}, {t: props.jwt.token}).then(response => {
            let dateJoined = new Date(response.data.created)
            setValue({joined: dateJoined.toDateString()});
        }).catch(err => {
            console.log(err);
        })
    }, []);
    
    
    
    

    return (
        <div class="user-details row gx-0 container-fluid">
            <div class="col-2">
                <div class="ms-3">
                    {props.userId && <ProfilePhoto userId={props.userId} />}
                </div>
            </div>
            
            <div class="col-10 mt-1">
                <h6>{props.name}</h6>
                <p class="time">Joined {value.joined && value.joined}</p>
            </div>
        </div>
    )
}

export default UserDetails;