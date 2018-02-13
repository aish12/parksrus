import React, { Component } from 'react';
import './ProjectReports.css';

import { Panel } from 'react-bootstrap'

class ProjectReports extends Component {
  render() {
    return (
        <div className="ProjectReports">
          <h1 className="ContainerHeader">Report & Repository</h1>
          <div className="ContainerContent">
            <a href="" className="Link">
              <Panel className="ProjectReport">
                <img className="ReportLogo" src="./images/api_logos/gitbook.svg" />
                <h4>Technical Report</h4>
              </Panel>
            </a>
            <a href="http://github.com/aish12/parksrus" className="Link">
              <Panel className="ProjectReport">
                <img className="ReportLogo" src="./images/api_logos/github.png"/>
                <h4>Github Repository</h4>
              </Panel>
            </a>
          </div>
        </div>
    );
  }
}

export default ProjectReports;
