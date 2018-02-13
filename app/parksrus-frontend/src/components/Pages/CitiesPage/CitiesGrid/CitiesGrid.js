import React, { Component } from 'react';
import './CitiesGrid.css';

import { Panel } from 'react-bootstrap'

class CitiesGrid extends Component {
  render() {
    let citiesGrid = this.props.cities.map(city =>
        <Panel className="GridCard">
          <img src={city.photos[0].image_uri} className="CardImage"/>
          <h1 className={["CardContent", "CardHeader"].join(' ')}>{city.name}</h1>
          <p className={["CardContent", "CardSubtitle"].join(' ')}>{city.state}</p>
        </Panel>
    );
    return citiesGrid;
  }
}

export default CitiesGrid;
