import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap'

import './HeroCarousel.css'

class HeroCarousel extends React.Component {
  render() {
    return (
      <Carousel className="Carousel"
        indicators={true}
        controls={false}
        interval={4000}>
        {this.props.children.map(child => (
          <Carousel.Item className="CarouselItem"> { child } </Carousel.Item>
          ))}
      </Carousel>
    );
  }
}

export default HeroCarousel;