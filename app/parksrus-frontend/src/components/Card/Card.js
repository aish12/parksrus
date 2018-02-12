import React, { Component } from 'react';
import './Card.css';

import { Panel } from 'react-bootstrap'

class Card extends Component {
  render() {
    return (
        <Panel className="Card">
          {this.props.children}
        </Panel>
    );
  }
}

export default Card;
