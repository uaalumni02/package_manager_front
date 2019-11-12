import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import '../App.css';
import './login';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/user/login', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response.success)
                // local storage code works; removed to test alert with password *****
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('user', response.data.user._id);
                // const password = response.data.token;
                // const localStoragePswd = localStorage.getItem('token', response.data.token);
                if (response.success == true) {
                    alert('corret password')
                } else {
                    alert('incorrect password')
                }
            }).catch(error => console.error('Error:', error));
    }
    return (
        <MDBContainer>
            <br></br>
            <MDBRow>
                <MDBCol md="5">
                    <MDBCard>
                        <div className="header pt-3 grey lighten-2">
                            <MDBRow className="d-flex justify-content-start">
                                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                    Log in
                                </h3>
                            </MDBRow>
                        </div>
                        <MDBCardBody>
                            <MDBInput label="Your username" onChange={e => setUsername(e.target.value)} group type="text" validate />
                            <MDBInput
                                label="Your password" onChange={e => setPassword(e.target.value)}
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                            />
                            <div className="text-center mb-4 mt-5">
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
                                    href="#!"
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