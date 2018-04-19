import React, { Component } from 'react';
import './CardGrid.css';

import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import { Panel, Badge } from 'react-bootstrap'

class CardGrid extends Component {
  constructor(props) {
    super(props);
  }

  getBadgeColorClassName() {
    const badgeClasses = ['OrangeBadge', 'RedBadge', 'BlueBadge'];
    return badgeClasses[Math.floor(Math.random() * badgeClasses.length)];
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
              {entity.city && entity.city.name && <div><h4>{entity.city.name}</h4></div>}
              {entity.state && <h5>{entity.state}</h5>}
              {entity.num_parks && <div><h3>{entity.num_parks}</h3><p>Total Parks</p></div>}
              {entity.views && <div><h3>{entity.views}</h3><p>Views</p></div>}
              {entity.tags && <div><h3>Tags</h3><p>{entity.tags.split(',').map(hashtag => <Badge className={this.getBadgeColorClassName()}>{"#" + hashtag}</Badge>)}</p></div>}
              {entity.review_data && <div><h3>{entity.review_data}</h3><p>Avg. Rating</p></div>}
              {entity.description && <div><p>{entity.description.split(' ').slice(0, 50).join(' ')}</p></div>}
              {entity.park && entity.park.name && <div><h3>Location</h3><p>{entity.park.name}</p></div>}
            </div>
          </Link>
        </Card>
    );
    return <div className="CardGrid">{cardGrid}</div>;
  }
}

export default CardGrid;
