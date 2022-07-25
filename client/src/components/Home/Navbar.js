import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import auth from "../auth/auth-helper";

function Navbar(props) {
    const handleClick = () => {
        auth.clearJWT(() => {
            window.location = "/";
        });
    }
    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark px-4">
                <div class="container-fluid">
                    <a class="navbar-brand">ASK</a>
                    <ul class="navbar-nav me-auto">

                        <li class="nav-item">
                            <a
                                class={
                                    props.active == "home" ?
                                        "nav-link active" : "nav-link"
                                } href="/home">
                                <FontAwesomeIcon icon={solid("house")} /> Home </a>
                        </li>

                        <li class="nav-item">
                            <a class={
                                props.active == "profile" ?
                                    "nav-link active" : "nav-link"
                            } href="/profile/edit">
                                <FontAwesomeIcon icon={solid("user")} /> Profile </a>
                        </li>

                        <li class="nav-item">
                            <a class={
                                props.active == "users" ?
                                    "nav-link active" : "nav-link"
                            } href="/users">
                                <FontAwesomeIcon icon={solid("users")} /> Users </a>
                        </li>

                    </ul>
                    <ul class="navbar-nav ms-auto">
                        <button class="nav-link btn btn-link" onClick={handleClick}>Logout</button>
                    </ul>

                </div>

            </nav>
        </div>
    );
}

export default Navbar;