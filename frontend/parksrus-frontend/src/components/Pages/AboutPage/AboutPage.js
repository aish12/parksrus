import React, { Component } from 'react';
import './AboutPage.css';

import Page from '../../Page/Page'
import Developers from './Developers/Developers'
import ProjectDescription from './ProjectDescription/ProjectDescription'
import ProjectStatistics from './ProjectStatistics/ProjectStatistics'
import DataDescription from './DataDescription/DataDescription'
import ToolDescription from './ToolDescription/ToolDescription'
import ProjectReports from './ProjectReports/ProjectReports'

class AboutPage extends Component {
  render() {
    return (
        <div>
          <Page className="Page">
            <Developers></Developers>
            <ProjectDescription></ProjectDescription>
            <ProjectStatistics></ProjectStatistics>
            <DataDescription></DataDescription>
            <ToolDescription></ToolDescription>
            <ProjectReports></ProjectReports>
          </Page>
        </div>
    );
  }
}

export default AboutPage;
