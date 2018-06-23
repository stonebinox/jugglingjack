import React, { Component } from 'react';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
