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
          <a href="http://gitbook.com/book/chimdindudenalexorakwue/parksr-us-technical-report" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/gitbook.svg" />
              <h4>Technical Report</h4>
            </Panel>
          </a>
          <a href="http://github.com/aish12/parksrus" className="CardLink">
            <Panel className="ProjectReport">
              <img className="ReportLogo" src="./images/api_logos/github.png"/>
              <h4>Github Repository</h4>
            </Panel>
          </a>
        </PageSection>
    );
  }
}

export default ProjectReports;
