import React, { Component } from 'react';
import './Card.css';
import '../ParagraphCard/ParagraphCard.css';
import '../DeveloperCard/DeveloperCard.css';
import '../SimpleCard/SimpleCard.css';
import '../StatisticCard/StatisticCard.css';

import { Panel } from 'react-bootstrap'

class Card extends Component {
  render() {
    return (
        <Panel className={["Card", this.props.classes].join(' ')}>
          {this.props.children}
        </Panel>
    );
  }
}

export default Card;
