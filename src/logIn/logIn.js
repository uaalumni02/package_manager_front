import React, { useState } from "react";
import './login.css';

const LoginForm = () => {
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
                console.log(response)
                setUsername();
                setPassword()
            }).catch(error => console.error('Error:', error));
    }
    return (
        <div className="container">
            <div className="row px-2">
                <div className="col-12 col-md-5 auth-box">
                    <h3 className="text-center mt-4">Log in to your account</h3>
                    <p className="text-center text-danger mt-4"> </p>
                    <form id="submitForm" className="px-3 py-5" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"></div>
                                </div>
                                <input type="text" name="username" onChange={e => setUsername(e.target.value)} className="form-control form-control-lg" id="username" placeholder="Username" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="ion ion-eye"></i></div>
                                </div>
                                <input type="password" name="password" onChange={e => setPassword(e.target.value)} className="form-control form-control-lg" id="password" placeholder="Password" />
                            </div>
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-tertiary btn-block">Login</button>
                    </form>
                    <br></br>
                    <a href="./signup" className="auth-box-footer">Don't have an account yet? &nbsp;<span>Sign Up</span></a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm