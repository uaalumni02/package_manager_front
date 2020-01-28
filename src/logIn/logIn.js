import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdbreact";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [InvalidLogin, setInvalidLogin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success === false || response.data.user.role === 'standard' ) {
          setInvalidLogin("Invalid username, password or pending approval");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user._id);
          setLoggedIn(true);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <MDBContainer>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="packageCenter"
        />
      </header>
      <br></br>
      {loggedIn ? <Redirect to="/package/" /> : ""}
      <MDBRow>
        <MDBCol md="5">
          <MDBCard className="loginCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <MDBInput
                label="Your username"
                onChange={e => setUsername(e.target.value.toLowerCase().trim())}
                group
                type="text"
                validate
              />

              <MDBInput
                label="Your password"
                onChange={e => setPassword(e.target.value.trim())}
                group
                type="password"
                validate
                containerClass="mb-0"
              />

              <div className="text-center mb-4 mt-5">
                <p>{InvalidLogin}</p>
                <MDBBtn
                  color="danger"
                  type="submit"
                  className="btn-block z-depth-2"
                  onClick={handleSubmit}
                >
                  Log in
                </MDBBtn>
              </div>

              <p className="font-small grey-text d-flex justify-content-center">
                Don't have an account?
                <a
                  href="/register"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Sign up
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Login;
