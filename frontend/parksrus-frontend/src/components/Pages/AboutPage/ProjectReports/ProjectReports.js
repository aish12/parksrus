import React, { Component } from 'react';
import './ProjectReports.css';

import PageSection from '../../../PageSection/PageSection'
import { Panel } from 'react-bootstrap'

class ProjectReports extends Component {
  render() {
    return (
        <PageSection backgroundColor={"#ff9f1c"}
                     color={"#ffffff"}
                     header={"Repository and Documentation"}>
          <a href="http://github.com/aish12/parksrus" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/github.png"/>
              <h4>Github Repository</h4>
            </Panel>
          </a>
          <a href="https://i.imgur.com/pzR2jbG.png" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/gitbook.svg"/>
              <h4>UML Diagram</h4>
            </Panel>
          </a>
          <a href="https://gitbook.com/book/aish12/report" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/gitbook.svg"/>
              <h4>Project Report</h4>
            </Panel>
          </a>
          <a href="https://gitbook.com/book/aish12/api" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/gitbook.svg"/>
              <h4>API Documentation</h4>
            </Panel>
          </a>
        </PageSection>
    );
  }
}

export default ProjectReports;
