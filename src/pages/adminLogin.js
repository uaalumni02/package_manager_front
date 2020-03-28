import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import Button from "../components/button";
import UserName from "../components/UserName";
import Password from "../components/Password";
import settings from "../config/configData";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

const initialState = {
  username: "",
  password: "",
  InvalidLogin: "",
  loggedIn: false
};

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};

const AdminLogin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/user/login`, {
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
        if (
          response.success === false ||
          response.data.user.role === "standard"
        ) {
          dispatch({
            field: "InvalidLogin",
            value: "Invalid username, password or pending approval"
          });
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch({
            field: "loggedIn",
            value: true
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const onChange = e => {
    dispatch({
      field: e.target.name,
      value: e.target.value.toLowerCase().trim()
    });
  };

  const { username, password, InvalidLogin, loggedIn } = state;

  return (
    <MDBContainer>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {loggedIn ? <Redirect to="/admins/" /> : ""}
      <MDBRow>
        <MDBCol md="5" className="col-md-4 mx-auto">
          <MDBCard className="loginCard">
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Admin Log in
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody>
              <UserName name="username" value={username} onChange={onChange} />
              <Password name="password" value={password} onChange={onChange} />
              <div className="text-center mb-4 mt-5">
                <p>{InvalidLogin}</p>
                <Button onClick={handleSubmit} label="Log In" />
              </div>
              <p className="font-small grey-text d-flex justify-content-center">
                Return to user log in?
                <a href="/" className="dark-grey-text font-weight-bold ml-1">
                  User Sign In
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default AdminLogin;
