import axios from "axios";
import React, {useEffect, useState} from "react";
import { Buffer } from "buffer";

export default function ProfilePhoto(props) {
    const [image, setImage] = useState("");
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/users/photo/${props.userId}`,
            responseType: "arraybuffer"
        })
        .then((response) => {
            console.log(response.data);
            const base64 = Buffer.from(response.data).toString('base64');
            
            setImage(base64);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    
    return(
        <div>
            <img className={`avatar ${props.customClasses}`} 
                style={props.customStyle}
                src={`data:image/*;base64,${image}`} />
        </div>
    )
}