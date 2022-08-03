import React, { useState } from "react";
import { create } from "../user/api-user";
import { signin } from "../auth/api-auth";
import auth from "../auth/auth-helper";
import { Navigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
export default function LoginAndSignup() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [loginInput, fillLoginInput] = useState({
    email: "",
    password: "",
    error: "",
    redirectToHome: false,
  });
  const [signupInput, fillSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    redirectToEditProfile: false,
  });
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //Login
  /**********************************************/
  const handleLoginInput = (event) => {
    const { name, value } = event.target;

    fillLoginInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: loginInput.email,
      password: loginInput.password,
    };

    signin(user)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          fillLoginInput({ ...loginInput, error: data.error });
          setSnackbar({ open: true, message: data.error });
        } else {
          auth.authenticate(data, () => {
            fillLoginInput({ ...loginInput, error: "", redirectToHome: true });
          });
        }
      })
      .catch((err) => {
        setSnackbar({ open: true, message: "Couldn't signin" });
      });
  };

  //Signup
  /**********************************************/

  const handleSignupInput = (event) => {
    const { name, value } = event.target;

    fillSignupInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSignupSubmit = () => {
    const user = {
      name: signupInput.name,
      email: signupInput.email,
      password: signupInput.password,
    };
    create(user)
      .then((response) => {
        console.log(response);
        signin({ email: user.email, password: user.password })
          .then((response) => {
            const data = response.data;
            if (data.error) {
              fillSignupInput({ ...signupInput, error: data.error });
              setSnackbar({ open: true, message: data.error });
            } else {
              auth.authenticate(data, () => {
                fillSignupInput({
                  ...signupInput,
                  error: "",
                  redirectToEditProfile: true,
                });
              });
            }
          })
          .catch((err) => {
            setSnackbar({ open: true, message: "Couldn't signup" });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loginInput.redirectToHome) {
    window.location = "/";
  }
  if (signupInput.redirectToEditProfile) {
    window.location = "/user/edit";
  }
  return (
    <div>
      <div className="login-signup container">
        <div class="row">
          <div class="login-signup-col col-lg-6 col-md-12">
            <div className="heading">
              <h2 className="login">Login</h2>
            </div>
            <div className="input-fields">
              <input
                onChange={handleLoginInput}
                value={loginInput.email}
                name="email"
                class="form-control"
                type="email"
                placeholder="Email"
              />
              <br />
              <input
                onChange={handleLoginInput}
                value={loginInput.password}
                name="password"
                class="form-control"
                type="password"
                placeholder="Password"
              />
              <br />
              <button
                onClick={handleLoginSubmit}
                type="button"
                class="btn btn-custom btn-dark"
              >
                Login
              </button>
            </div>
          </div>
          <div class="login-signup-col col-lg-6 col-md-12">
            <div className="heading">
              <h2 className="signup">Signup</h2>
            </div>
            <div className="input-fields">
              <input
                onChange={handleSignupInput}
                value={signupInput.name}
                name="name"
                class="form-control"
                type="text"
                placeholder="Name"
              />
              <br />
              <input
                onChange={handleSignupInput}
                value={signupInput.email}
                name="email"
                class="form-control"
                type="email"
                placeholder="Email"
              />
              <br />
              <input
                onChange={handleSignupInput}
                value={signupInput.password}
                name="password"
                class="form-control"
                type="password"
                placeholder="Password"
              />
              <br />
              <button
                onClick={handleSignupSubmit}
                type="button"
                class="btn btn-custom btn-dark"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </div>
  );
}
