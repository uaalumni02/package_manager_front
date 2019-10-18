import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
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
            }).catch(error => console.error('Error:', error));
        this.setState({ username: '', password: '' })
    }

    render() {
        return (
            <div className="container">
                <div className="row px-2">
                    <div className="col-12 col-md-5 auth-box">
                        <h3 className="text-center mt-4">Log in to your account</h3>
                        <p className="text-center text-danger mt-4"> </p>
                        <form id="submitForm" className="px-3 py-5" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"></div>
                                    </div>
                                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control form-control-lg" id="username" placeholder="Username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="ion ion-eye"></i></div>
                                    </div>
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg" id="password" placeholder="Password" />
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