import React from "react";
import sherlock from "../img/2.jpg";
import irene from "../img/3.jpg";
import mary from "../img/4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Navbar from "../Home/Navbar";
import User from "./User";


function Users() {
    let users = [
        {
            picture: sherlock,
            name: "Sherlock Holmes",
            timeJoined: "Nov 4, 2022",
            about: "Interested in crime investigation"
        },
        {
            picture: irene,
            name: "Irene Adler",
            timeJoined: "Nov 4, 2022",
            about: "Expert in business management"
        },
        {
            picture: mary,
            name: "Mary Sutherland",
            timeJoined: "Nov 4, 2022",
            about: "A UX designer and researcher"
        }
    ];

    return (
        <div>
            <div class="users-view">
                <div class="user-list row">
                    {
                        users.map(user => {
                            return <User 
                                picture={user.picture}
                                name={user.name}
                                timeJoined={user.timeJoined}
                                about={user.about}
                                customStyle="col-lg-4 col-md-6"
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Users;