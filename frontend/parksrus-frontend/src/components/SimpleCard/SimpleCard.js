import React, { Component } from 'react';
import Card from '../Card/Card'

class SimpleCard extends Component {
  render() {
    return (
        <Card classes={"SimpleCard"}>
          <a href={this.props.url} className={"CardLink"}>
            <h3>{this.props.header}</h3>
            <p>{this.props.content}</p>
          </a>
        </Card>
    );
  }
}

export default SimpleCard;
