import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "../components/button";
import {settings} from "../config/configData"

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdbreact";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${settings.production.apiBaseUrl}/api/user/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setRole("standard");
        }
      })
      .catch(error => console.error("Error:", error));
  };
  return (
    <MDBContainer>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {role === "standard" ? <Redirect to="/adminApproval/" /> : ""}
      <MDBRow>
        <MDBCol md="5" className="col-md-4 mx-auto">
          <MDBCard className="loginCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Register for Account...
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <MDBInput
                label="Your username"
                onChange={e => setUsername(e.target.value.trim())}
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
                <Button onClick={handleSubmit} title="register" />
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Return to log in?
                <a href="/" className="dark-grey-text font-weight-bold ml-1">
                  Log In
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Register;
