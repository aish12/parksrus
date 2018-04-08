import React, { Component } from 'react';
import './CardGrid.css';

import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import { Panel, Badge } from 'react-bootstrap'

class CardGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let endpoint = this.props.endpoint;

    let cardGrid = this.props.entities.map(entity =>
        <Card key={entity.id}
              classes={"GridCard"}>
          <Link to={'/' + endpoint + '/' + entity.id} className={"CardLink"}>
            <img src={entity.image_uri} className="CardImage"/>
            <div className={["CardContent", "CardHover"].join(' ')} >
              {entity.name && <h1 className={["CardContent", "CardHeader"].join(' ')}>{entity.name}</h1>}
              {entity.state && <p className={["CardContent", "CardSubtitle"].join(' ')}>{entity.state}</p>}
              {entity.num_parks && <div><h3>{entity.num_parks}</h3><p>Total Parks</p></div>}
              {entity.views && <div><h3>{entity.views}</h3><p>Views</p></div>}
              {entity.tags && <div><h3>Tags</h3><p>{entity.tags.split(',').map(hashtag => <Badge>{"#" + hashtag}</Badge>)}</p></div>}
              {entity.review_data && <div><h3>{entity.review_data}</h3><p>Avg. Rating</p></div>}
              {entity.park && entity.park.name && <div><h3>Location</h3><p>{entity.park.name}</p></div>}
            </div>
          </Link>
        </Card>
    );
    return <div className="CardGrid">{cardGrid}</div>;
  }
}

export default CardGrid;
