import React, { Component } from 'react';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.setLayer('home');
        var status = this.props.loggedIn;
        if (status) {
            var lFlag = "block";
            var liFlag = "none";
        }
        else {
            var lFlag = "none";
            var liFlag = "block";
        }
        this.state = {
            logoutFlag: lFlag,
            linkFlag: liFlag,
        };
    }

    componentWillReceiveProps(nextProps) {
        var status = nextProps.loggedIn;
        if (status) {
            var lFlag = "block";
            var liFlag = "none";
        }
        else {
            var lFlag = "none";
            var liFlag = "block";
        }
        this.state = {
            logoutFlag: lFlag,
            linkFlag: liFlag,
        };
    }

    handleLogoClick() {
        window.location.reload(true);
    }

    setLayer(layer) {
        this.props.onStateChanged(layer);
    }

    logout() {
        this.props.logout();
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
                        <a className="navbar-brand" href="#home" onClick={this.handleLogoClick}>
                            <img src="JJ-Logo.png" className="img-responsive" width="30" style={{marginTop: "-5px"}} alt="Juggling Jack"/>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav" style={{marginLeft: "-25px"}}>
                            <li><a href="#home" onClick={this.handleLogoClick}><img src="JJ-Wordmark.png" alt="Juggling Jack" className="img-responsive" width="115" /></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li style={{display: this.state.linkFlag}}><a href="javascript:void(0)" className="navlinks" onClick={() => this.setLayer('jobs')}>Jobs</a></li>
                            <li style={{display: this.state.linkFlag}}><a href="javascript:void(0)" className="navlinks" onClick={() => this.setLayer('pricing')}>Pricing</a></li>
                            <li style={{display: this.state.linkFlag}}><a href="javascript:void(0)" className="navlinks">Who is a Juggling Jack?</a></li>
                            <li style={{display: this.state.linkFlag}}><a href="javascript:void(0)" className="navlinks" onClick={() => this.setLayer('login')}>Login</a></li>
                            <li style={{display: this.state.linkFlag}}><button type="button" className="btn btn-primary navbar-btn btn-goto" onClick={() => this.setLayer('signup')}>Sign up!</button></li>
                            <li style={{display: this.state.logoutFlag}}><button type="button" className="btn btn-primary navbar-btn btn-goto" onClick={() => this.logout()}><span className="glyphicon glyphicon-log-out"></span> Log out</button></li>
                            <li><a></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}