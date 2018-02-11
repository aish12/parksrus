import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap'

import './HeroCarousel.css'

class HeroCarousel extends React.Component {
  render() {
    return (
      <Carousel className="Carousel">
        {this.props.children.map(child => (
          <Carousel.Item className="CarouselItem"> { child } </Carousel.Item>
          ))}
      </Carousel>
    );
  }
}

export default HeroCarousel;