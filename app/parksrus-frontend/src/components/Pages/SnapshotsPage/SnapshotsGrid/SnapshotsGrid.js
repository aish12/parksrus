import React, { Component } from 'react';
import './SnapshotsGrid.css';

import { Panel } from 'react-bootstrap'

class SnapshotsGrid extends Component {
  render() {
    let snapshotsGrid = this.props.snapshots.map(snapshot =>
        <Panel className="GridCard">
          <img src={snapshot.image_uri} className={["CardImage", "SnapshotImage"].join(' ')}/>
        </Panel>
    );
    return snapshotsGrid;
  }
}

export default SnapshotsGrid;
