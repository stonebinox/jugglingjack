import React, { Component } from 'react';

export class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    handleLogoClick() {
        window.location.reload(true);
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.handleLogoClick}>
                            <div className="row">
                                <div className="col-sm-3"><img src="JJ-Logo.png" className="img-responsive" width="40" style={{marginTop: "-10px"}} /></div>
                                <div className="col-sm-9"><img src="JJ-Wordmark.png" alt="Juggling Jack" className="img-responsive" width="200" style={{marginTop: "-5px", marginLeft: "-20px"}} /></div>
                            </div>
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="javascript:void(0)" className="navlinks">Pricing</a></li>
                        <li><a href="javascript:void(0)" className="navlinks">Who is a Juggling Jack?</a></li>
                        <li><a href="javascript:void(0)" className="navlinks">Login</a></li>
                        <li><button type="button" className="btn btn-primary navbar-btn btn-goto">Sign up!</button></li>
                        <li><a></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}