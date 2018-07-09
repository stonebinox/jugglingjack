import React, { Component } from 'react';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Jobs } from './Jobs.js';
import { Pricing } from './Pricing.js';
import { Login } from './Login.js';
import { SignUp } from './SignUp.js';
import { Dashboard } from './Dashboard.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsFlag: "false",
      pricingFlag: "false",
      homeFlag: "false",
      loginFlag: "false",
      signupFlag: "false",
      dashboardFlag: "false",
      loginStatus: false
    };
    this.changeState = this.changeState.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.logout = this.logout.bind(this);
  }

  changeState(data) {
    switch(data) {
      case "jobs":
      this.setState({
        jobsFlag: "true",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "false",
        dashboardFlag: "false"
      });
      break;
      case "pricing":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "true",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "false",
        dashboardFlag: "false"
      });
      break;
      case "home":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "true",
        loginFlag: "false",
        signupFlag: "false",
        dashboardFlag: "false"
      });
      break;
      case "login":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "true",
        signupFlag: "false",
        dashboardFlag: "false"
      });
      break;  
      case "signup":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "true",
        dashboardFlag: "false"
      });
      break;
      case "dashboard":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "false",
        dashboardFlag: "true"
      });
      break;
      default:
      //do nothing
      break;
    }
  }

  handleSession(flag) {
    if (flag) {
      this.setState({
        loginStatus: true
      });
      this.changeState("dashboard");
    }
    else {
      this.setState({
        loginStatus: false
      });
      this.changeState("home");
    }
  }

  logout() {
    this.handleSession(false);
  }

  render() {
    return (
      <div>
        <Navbar onStateChanged={this.changeState} loggedIn={this.state.loginStatus} logout={this.logout}/>
        <Home active={this.state.homeFlag} />
        <Jobs active={this.state.jobsFlag} />
        <Pricing active={this.state.pricingFlag} />
        <Login active={this.state.loginFlag} onLoggedIn={this.handleSession} />
        <SignUp active={this.state.signupFlag} layerLoad={this.changeState} />
        <Dashboard active={this.state.dashboardFlag} />
      </div>
    );
  }
}

export default App;
