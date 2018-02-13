import React, { Component } from 'react';
import './ParksGrid.css';

import { Panel } from 'react-bootstrap'

class ParksGrid extends Component {
  render() {
    let parksGrid = this.props.parks.map(park =>
      <Panel className="GridCard">
        <img src={park.photos[0].image_uri} className="CardImage"/>
        <h1 className={["CardContent", "CardHeader"].join(' ')}>{park.name}</h1>
        <p className={["CardContent", "CardSubtitle"].join(' ')}>{park.city.name}, {park.city.state}</p>
      </Panel>
    );
    return parksGrid;
  }
}

export default ParksGrid;
