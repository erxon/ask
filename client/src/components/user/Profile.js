import React from "react";
import Navbar from "../Home/Navbar";
import Avatar from "./Avatar";
import sherlock from "../img/2.jpg";
import User from "./User";
import PostedQuestion from "./PostedQuestion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {useParams} from "react-router-dom";

function Profile() {
    const {userId} = useParams();
    const photoUrl = userId ? `/api/users/photo/${userId}?${new Date().getTime()}` : "/api/users/defaultPhoto";
    return (
        <div>
            <Navbar />
            <div class="profile border shadow-sm">
                <div class="center">
                    <Avatar picture={photoUrl} />
                </div>
                <div class="center user-info">
                    <h3>Mark Vonkovitch</h3>
                    <p class="date">Joined in Nov 6, 2022</p>
                    <p class="about d-inline">A freelance web developer</p>
                    <a href="/profile/edit" class="d-inline ms-3 edit-profile-icon"><FontAwesomeIcon icon={solid("pencil")} /> </a>
                </div>
                <div class="text-center">
                    <div class="tabs btn-group">
                        <button
                            class="btn btn-outline-secondary"
                            data-bs-toggle="collapse"
                            data-bs-target="#following">Following</button>
                        <button 
                            class="btn btn-outline-secondary"
                            data-bs-toggle="collapse"
                            data-bs-target="#followers">Followers</button>
                        <button 
                            class="btn btn-outline-secondary"
                            data-bs-toggle="collapse"
                            data-bs-target="#questions">Questions</button>
                    </div>
                </div>
                <div>
                    <div class="collapse" id="following">
                        <div class="following mt-3 mx-auto">
                            <User
                                picture={sherlock}
                                name="Sherlock Holmes"
                                timeJoined="Nov 4, 2022"
                                about="Interested in crime investigation"
                            />
                            <User
                                picture={sherlock}
                                name="Sherlock Holmes"
                                timeJoined="Nov 4, 2022"
                                about="Interested in crime investigation"
                            />
                        </div>
                    </div>
                    <div class="collapse" id="followers">
                        <div class="following mt-3 mx-auto">
                            <User
                                picture={sherlock}
                                name="Sherlock Holmes"
                                timeJoined="Nov 4, 2022"
                                about="Interested in crime investigation"
                            />
                            <User
                                picture={sherlock}
                                name="Sherlock Holmes"
                                timeJoined="Nov 4, 2022"
                                about="Interested in crime investigation"
                            />
                        </div>
                    </div>
                    <div class="collapse" id="questions">
                        <div class="following mt-3 mx-auto">
                            <PostedQuestion />
                            <PostedQuestion />
                        </div>
                    </div>
                </div>

            </div>

            <div>

            </div>

        </div>
    );
}

export default Profile;