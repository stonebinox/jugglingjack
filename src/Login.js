import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <h1 className="text-center">Login to your account</h1>
                    <br/>
                    <br/>
                    <div className="large-box white-overlay">
                        <form name="login">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="Enter a valid email ID" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="********" required />
                            </div>
                            <br/>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary bold">Login</button>&nbsp;&nbsp;<button type="button" class="btn btn-default bold">Don't have an account?</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}