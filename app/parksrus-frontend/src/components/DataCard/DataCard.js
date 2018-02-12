import React, { Component } from 'react';
import './DataCard.css';

import { Panel } from 'react-bootstrap'

class DataCard extends Component {
  render() {
    return (
        <a href={this.props.apiUrl} className="Link">
          <Panel className="DataCard">
            <h4 className="Name">{this.props.apiName}</h4>
            <p className="Paragraph">{this.props.apiDescription}</p>
          </Panel>
        </a>
    );
  }
}

export default DataCard;
