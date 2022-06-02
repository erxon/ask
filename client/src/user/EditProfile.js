import React from "react";
import Navbar from "../components/Home/Navbar";
import pic from "../components/img/1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function EditProfile() {
    return (
        <div>
            <Navbar active="profile" />
            <div>
                {/*Display image*/}
                <img
                    src={pic}
                    class="rounded-circle mx-auto d-block mt-4"
                    style={{ width: "100px", height: "100px" }}
                    alt="" />
                <a
                    class="mt-3 d-block text-center text-decoration-none"
                    href="#">
                    Change profile picture
                </a>

                <div class="mx-auto p-3 w-50">
                    <div class="mt-3">
                        <label for="name" class="form-label">Name</label>
                        <input
                            class="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value="Mark Vonkovitch" />

                    </div>

                    <div class="mt-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                            class="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value="mark@vonko.info" />
                    </div>

                    <div class="mt-3">
                        <label for="about" class="form-label">About me</label>
                        <textarea
                            class="form-control"
                            id="about"
                            name="about"
                            value="freelancer" />
                    </div>
                </div>
                <button
                    type="button"
                    class="bg-transparent btn btn-link mt-3 d-block mx-auto text-decoration-none"
                    data-bs-toggle="modal" 
                    data-bs-target="#changePassword"
                    >
                    Change password
                </button>
                <button class="d-block mx-auto mt-4 btn btn-dark">Save</button>

            </div>

            <div class="modal fade" id="changePassword" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div style={{backgroundColor: "#205375", color: "#fff"}} class="modal-header">
                            <FontAwesomeIcon icon={solid("key")} />
                            <h5 class="modal-title me-auto ms-2">Change password</h5>
                        </div>
                        <div class="modal-body">
                            <input type="password" class="form-control" placeholder="Current password"/>
                            <input type="password" class="mt-3 form-control" placeholder="New password"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary me-auto">Save</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default EditProfile;