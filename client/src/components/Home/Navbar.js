import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from "../auth/auth-helper";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand navbar-dark px-4">
        <div class="container-fluid">
          <a class="navbar-brand">ASK</a>
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            {auth.isAuthenticated() && (
              <div className="d-flex">
                <li class="nav-item">
                  <Link
                    to={"/profile/" + auth.isAuthenticated().user._id}
                    className="nav-link"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-sm btn-secondary"
                    onClick={() => {
                      auth.clearJWT(() => {
                        window.location = "/";
                      });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </div>
            )}
            {!auth.isAuthenticated() && (
              <li className="nav-item">
                <Link to="/auth" className="nav-link btn btn-custom btn-sm">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
