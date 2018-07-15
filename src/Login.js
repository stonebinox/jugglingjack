import React, { Component } from 'react';
import $ from 'jquery';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: "form-group",
            passwordError: "form-group",
            errorDisplay: "none",
            buttonStatus: "",
            loginButtonFlag: "block",
            loginStatusFlag: "none"
        };
        this.loginButton = this.loginButton.bind(this);
    }

    getUserData(email) {
        var that = this;
        $.ajax({
            url: "https://jugglingjack-backend.herokuapp.com/api/getUserID",
            method: "get",
            data: {
                user_email: email
            },
            error: function(error) {
                console.log(error);
                alert("Something went wrong while fetching user data. Please refresh the page and try again.");
            },
            success: function(response) {
                response = $.trim(response);
                switch (response) {
                    case "INVALID_PARAMETERS":
                    default:
                    if (!isNaN(response)) {
                        that.props.onUserID(response);
                    }
                    else {
                        console.log(response);
                        alert("Something went wrong while fetching user data. Please refresh the page and try again.");
                    }
                    break;
                }
            }
        });
    }

    loginButton() {
        var email = document.login.email.value;
        email = email.trim();
        if ((email !== "") && (email !== null) && (email !== undefined)) {
            this.setState({
                emailError: "form-group"
            }); 
            var password = document.login.password.value;
            if (password.length >= 8) {
                this.setState({
                    passwordError: "form-group"
                }); 
                var that = this;
                $.ajax({
                    url: "https://jugglingjack-backend.herokuapp.com/api/login",
                    method: "post",
                    data: {
                        email: email,
                        password: password
                    },
                    error: function(err) {
                        console.log(err);
                    },
                    success: function(response){
                        response = $.trim(response);
                        switch(response) {
                            case "INVALID_PARAMETERS":
                            case "INVALID_USER_CREDENTIALS":
                            default:
                            that.setState({
                                errorDisplay: "block",
                                loginButtonFlag: "block",
                                loginStatusFlag: "none"
                            });
                            break;
                            case "AUTHENTICATE_USER":
                            that.setState({
                                errorDisplay: "none",
                                loginButtonFlag: "block",
                                loginStatusFlag: "none"
                            });
                            that.props.onLoggedIn(true);
                            that.getUserData(email);
                            break;
                        }
                    },
                    beforeSend: function() {
                        that.setState({
                            loginButtonFlag: "none",
                            loginStatusFlag: "block"
                        });
                    }
                });
            }
            else {
                this.setState({
                    passwordError: "form-group has-error"
                }); 
            }
        }
        else {
            this.setState({
                emailError: "form-group has-error"
            }); 
        }
    }

    render() {
        setTimeout(function(){
            $("#email").focus();
        }, 500);
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <br/>
                    <br/>
                    <h1 className="text-center">Login to your account</h1>
                    <br/>
                    <br/>
                    <div className="large-box white-overlay">
                        <div className="alert alert-danger text-center" style={{display: this.state.errorDisplay}}>
                            <strong>Incorrect credentials</strong> Please verify the details and try again.
                        </div>
                        <form name="login">
                            <div className={this.state.emailError}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="Enter a valid email ID" required />
                            </div>
                            <div className={this.state.passwordError}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="********" required />
                            </div>
                            <br/>
                            <div className="text-center" style={{display: this.state.loginButtonFlag}}>
                                <button type="button" className="btn btn-primary bold" onClick={this.loginButton}>Login</button>&nbsp;&nbsp;<button type="button" className="btn btn-default bold">Don't have an account?</button>
                            </div>
                            <div className="alert alert-info text-center" style={{display: this.state.loginStatusFlag}}>
                                <strong>Please Wait</strong> Checking your details ...
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}