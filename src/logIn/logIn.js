import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row px-2">
                    <div className="col-12 col-md-5 auth-box">
                        <h3 className="text-center mt-4">Log in to your account</h3>
                        <p className="text-center text-danger mt-4"> </p>
                        <form className="px-3 py-5">
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"></div>
                                    </div>
                                    <input type="text" name="username" className="form-control form-control-lg" id="username" placeholder="Username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-eye"></i></div>
                                    </div>
                                    <input type="password" name="password" className="form-control form-control-lg" id="password" placeholder="Password" />
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
        )
    }
}


export default Login