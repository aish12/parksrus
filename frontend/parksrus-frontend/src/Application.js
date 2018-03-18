import React, { Component } from 'react';
import './Application.css';

import Main from './components/Main/Main'
import NavigationBar from './components/NavigationBar/NavigationBar'

class Application extends Component {
  render() {
    return (
        <div>
          <NavigationBar/>
          <Main/>
        </div>
    );
  }
}

export default Application;
