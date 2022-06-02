import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';


function Navbar(props) {
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
                                } href="#">
                            <FontAwesomeIcon icon={solid("house")} /> Home </a>
                        </li>

                        <li class="nav-item">
                            <a class={
                                    props.active == "profile" ? 
                                    "nav-link active" : "nav-link"
                            } href="#">
                            <FontAwesomeIcon icon={solid("user")} /> Profile </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;