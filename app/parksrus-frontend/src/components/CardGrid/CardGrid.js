import React, { Component } from 'react';
import './CardGrid.css';

import Card from '../Card/Card'
import { Link } from 'react-router-dom'

class CardGrid extends Component {
  render() {
    let imageHeight = "350px";
    if (this.props.hasOwnProperty('imageHeight')) {
      imageHeight = this.props.imageHeight;
    }
    let endpoint = this.props.endpoint;
    if (endpoint === 'photos') {
      endpoint = 'snapshots'
    }
    let cardGrid = this.props.entities.map(entity =>
        <Card key={entity.id}
              classes={"GridCard"}>
          <Link to={'/' + endpoint + '/' + entity.id} className={"CardLink"}>
            <img src={entity.image_uri} className="CardImage" style={{height: imageHeight}}/>
            {entity.name && <h1 className={["CardContent", "CardHeader"].join(' ')}>{entity.name}</h1>}
            {entity.state && <p className={["CardContent", "CardSubtitle"].join(' ')}>{entity.state}</p>}
          </Link>
        </Card>
    );
    return <div className="CardGrid">{cardGrid}</div>;
  }
}

export default CardGrid;
