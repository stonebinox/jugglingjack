import React, { Component } from 'react';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Jobs } from './Jobs.js';
import { Pricing } from './Pricing.js';
import { Login } from './Login.js';
import { SignUp } from './SignUp.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsFlag: "false",
      pricingFlag: "false",
      homeFlag: "false",
      loginFlag: "false",
      signupFlag: "false"
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(data) {
    switch(data) {
      case "jobs":
      this.setState({
        jobsFlag: "true",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "false"
      });
      break;
      case "pricing":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "true",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "false"
      });
      break;
      case "home":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "true",
        loginFlag: "false",
        signupFlag: "false"
      });
      break;
      case "login":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "true",
        signupFlag: "false"
      });
      break;  
      case "signup":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "false",
        signupFlag: "true"
      });
      break;
      default:
      //do nothing
      break;
    }
  }

  render() {
    return (
      <div>
        <Navbar onStateChanged={this.changeState} />
        <Home active={this.state.homeFlag} />
        <Jobs active={this.state.jobsFlag} />
        <Pricing active={this.state.pricingFlag} />
        <Login active={this.state.loginFlag} />
        <SignUp active={this.state.signupFlag} />
      </div>
    );
  }
}

export default App;
