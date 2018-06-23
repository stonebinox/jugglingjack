import React, { Component } from 'react';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Jobs } from './Jobs.js';
import { Pricing } from './Pricing.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsFlag: "false",
      pricingFlag: "false",
      homeFlag: "false"
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(data) {
    switch(data) {
      case "jobs":
      this.setState({
        jobsFlag: "true",
        pricingFlag: "false",
        homeFlag: "false"
      });
      break;
      case "pricing":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "true",
        homeFlag: "false"
      });
      break;
      case "home":
      this.setState({
        jobsFlag: "false",
        pricingFlag: "false",
        homeFlag: "true"
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
      </div>
    );
  }
}

export default App;
