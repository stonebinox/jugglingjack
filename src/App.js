import React, { Component } from 'react';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Jobs } from './Jobs.js';
import { Pricing } from './Pricing.js';
import { Login } from './Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsFlag: "false",
      pricingFlag: "false",
      homeFlag: "false",
      loginFlag: "false"
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
        loginFlag: "false"
      });
      break;
      case "pricing":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "true",
        homeFlag: "false",
        loginFlag: "false"
      });
      break;
      case "home":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "true",
        loginFlag: "false"
      });
      break;
      case "login":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "false",
        loginFlag: "true"
      });
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
      </div>
    );
  }
}

export default App;
