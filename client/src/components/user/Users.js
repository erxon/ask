import React from "react";
import sherlock from "../img/2.jpg";
import irene from "../img/3.jpg";
import mary from "../img/4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Navbar from "../Home/Navbar";

function Users() {
    return (
        <div>
            <Navbar active="users" />
            <div class="users-view">
                <div class="head">
                    <div class="d-inline">
                        <FontAwesomeIcon icon={solid("users")} />
                    </div>
                    <h5 class="d-inline ms-3">Users</h5>
                </div>
                <div class="user-list row">
                    <div class="user col-lg-4 col-md-6">
                        <div class="row gx-0 shadow border pb-4">
                            <div class="col-2">
                                <img src={sherlock} alt="" class="avatar m-3 mt-4" />
                            </div>

                            <div class="info col-10 pt-4 ps-4">
                                <h6>Sherlock Holmes</h6>
                                <p class="time">Joined Nov 4, 2022</p>
                                <p>Interested in crime investigation</p>
                                <a href="#">Follow</a>
                            </div>
                        </div>
                    </div>

                    <div class="user col-lg-4 col-md-6">
                        <div class="row gx-0 shadow border pb-4">
                            <div class="col-2">
                                <img src={mary} alt="" class="avatar m-3 mt-4" />
                            </div>

                            <div class="info col-10 pt-4 ps-4">
                                <h6>Mary Sutherland</h6>
                                <p class="time">Joined Nov 4, 2022</p>
                                <p>A UX designer and researcher</p>
                                <a href="#">Follow</a>
                            </div>
                        </div>
                    </div>

                    <div class="user col-lg-4 col-md-6">
                        <div class="row gx-0 shadow border pb-4">
                            <div class="col-2">
                                <img src={irene} alt="" class="avatar m-3 mt-4" />
                            </div>

                            <div class="info col-10 pt-4 ps-4">
                                <h6>Irene Adler</h6>
                                <p class="time">Joined Nov 4, 2022</p>
                                <p>Expert in business management</p>
                                <a href="#">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Users;