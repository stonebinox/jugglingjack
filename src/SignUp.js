import React, { Component } from 'react';

export class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <br/>
                    <br/>
                    <h1 className="text-center">Create an account</h1>
                    <br/>
                    <br/>
                    <div className="large-box white-overlay">
                        <form name="signup" autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="name">Full name</label>
                                <input type="text" name="name" id="name" placeholder="Your full name" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signupemail">Email</label>
                                <input type="email" name="signupemail" id="signupemail" placeholder="Enter a valid email ID" required className="form-control" />
                            </div> 
                            <div className="form-group">
                                <label htmlFor="password1">Create password</label>
                                <input type="password" name="password1" id="password1" placeholder="Minimum 8 characters" required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Repeat password</label>
                                <input type="password" name="password2" id="password2" placeholder="Ensure it's the same" required className="form-control" />
                            </div>
                            <br/>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary bold">Proceed <span className="glyphicon glyphicon-menu-right"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}