import React, { Component } from 'react';

import './Hero.css';

class Hero extends React.Component {
  render() {
    return (
        <div className="Hero">
          <h1 className="HeroHeader">{this.props.heroHeader}</h1>
          <img src={this.props.heroUrl} className="HeroImage"/>
        </div>
    );
  }
}

export default Hero;

