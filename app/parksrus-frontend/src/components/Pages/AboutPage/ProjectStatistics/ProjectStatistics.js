import React, { Component } from 'react';

import { Panel } from 'react-bootstrap'

import './ProjectStatistics.css'

class ProjectStatistics extends Component {
  render() {
    return (
        <div className="ProjectStatistics">
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">76</h1>
            <p>Total Commits</p>
          </Panel>
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">56</h1>
            <p>Total Issues</p>
          </Panel>
          <Panel className="StatisticsPanel">
            <h1 className="Statistic">81</h1>
            <p>Total Unit Tests</p>
          </Panel>
        </div>
    );
  }
}

export default ProjectStatistics;
