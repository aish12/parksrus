import React, { Component } from 'react';
import './CardGrid.css';

import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import { Panel } from 'react-bootstrap'

class CardGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageHeight = "350px";
    if (this.props.hasOwnProperty('imageHeight')) {
      imageHeight = this.props.imageHeight;
    }
    let endpoint = this.props.endpoint;

    let cardGrid = this.props.entities.map(entity =>
        <Card key={entity.id}
              classes={"GridCard"}>
          <Link to={'/' + endpoint + '/' + entity.id} className={"CardLink"}>
            <img src={entity.image_uri} className="CardImage" style={{height: imageHeight}}/>
            {entity.name && <h1 className={["CardContent", "CardHeader"].join(' ')}>{entity.name}</h1>}
            {entity.state && <p className={["CardContent", "CardSubtitle"].join(' ')}>{entity.state}</p>}
            <div className={["CardContent", "CardHover"].join(' ')} >
              {entity.num_parks && <div><h3>{entity.num_parks}</h3><p>Total Parks</p></div>}
            {entity.views && <div><h3>{entity.views}</h3><p>Views</p></div>}
            {entity.tags && <div><h3>Tags</h3><p>{entity.tags}</p></div>}
            {entity.review_data && <div><h3>{entity.review_data}</h3><p>Avg. Rating</p></div>}
            {entity.park && entity.park.name && <p>{entity.park.name}</p>}
            </div>
          </Link>
        </Card>
    );
    return <div className="CardGrid">{cardGrid}</div>;
  }
}

export default CardGrid;
