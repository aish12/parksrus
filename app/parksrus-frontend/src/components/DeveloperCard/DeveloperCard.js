import React, { Component } from 'react';
import './DeveloperCard.css';

import Card from '../Card/Card'
import { Badge, Tooltip, OverlayTrigger } from 'react-bootstrap'

class DeveloperCard extends Component {
  render() {
    const commitsTooltip = <Tooltip id="commitsTooltip">Commits</Tooltip>;
    const issuesTooltip = <Tooltip id="issuesTooltip">Issues Closed</Tooltip>;
    const unittestsTooltip = <Tooltip id="unittestsTooltip">Unit Tests</Tooltip>;

    return (
        <Card>
          <img src={this.props.avatarUrl} className="Avatar"/>
          <h4 className="Name">{this.props.name}</h4>
          <h6 className="Header">Biography</h6>
          <p className="Paragraph">{this.props.biography}</p>
          <h6 className="Header">Responsibilites</h6>
          <p className="Paragraph">{this.props.responsibilities}</p>
          <div className="GithubStats">
            <OverlayTrigger placement="bottom" overlay={commitsTooltip}>
              <Badge className={["Badge", "Commits"]}>{this.props.commits}</Badge>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={issuesTooltip}>
              <Badge className={["Badge", "Issues"]}>{this.props.issues}</Badge>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={unittestsTooltip}>
              <Badge className={["Badge", "UnitTests"]}>{this.props.unittests}</Badge>
            </OverlayTrigger>
          </div>
        </Card>
    );
  }
}

export default DeveloperCard;
