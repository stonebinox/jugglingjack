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
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span> 
                        </button>
                        <a className="navbar-brand" href="#" onClick={this.handleLogoClick}>
                            <img src="JJ-Logo.png" className="img-responsive" width="30" style={{marginTop: "-5px"}} />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav" style={{marginLeft: "-25px"}}>
                            <li><a href="#" onClick={this.handleLogoClick}><img src="JJ-Wordmark.png" alt="Juggling Jack" className="img-responsive" width="115" /></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="javascript:void(0)" className="navlinks">Pricing</a></li>
                            <li><a href="javascript:void(0)" className="navlinks">Who is a Juggling Jack?</a></li>
                            <li><a href="javascript:void(0)" className="navlinks">Login</a></li>
                            <li><button type="button" className="btn btn-primary navbar-btn btn-goto">Sign up!</button></li>
                            <li><a></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}