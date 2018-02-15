import React, { Component } from 'react';
import Card from '../Card/Card'

class StatisticCard extends Component {
  render() {
    return (
        <Card classes={"StatisticCard"}>
          <h1>{this.props.statistic}</h1>
          <p>{this.props.description}</p>
        </Card>
    );
  }
}

export default StatisticCard;
