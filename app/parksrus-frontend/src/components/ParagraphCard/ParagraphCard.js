import React, { Component } from 'react';
import Card from '../Card/Card'

import './ParagraphCard'

class ParagraphCard extends Component {
  render() {
    return (
        <Card classes={"ParagraphCard"}>
          <h1>{this.props.header}</h1>
          <p>{this.props.content}</p>
        </Card>
    );
  }
}

export default ParagraphCard;
