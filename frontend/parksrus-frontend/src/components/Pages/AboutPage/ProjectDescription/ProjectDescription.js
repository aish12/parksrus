import React, { Component } from 'react';
import './ProjectDescription.css'

import ParagraphCard from '../../../ParagraphCard/ParagraphCard'
import PageSection from '../../../PageSection/PageSection'

class ProjectDescription extends Component {
  render() {
    const description = "We connect theme park enthusiasts," +
        " trendy urbanites, and travel aficionados through a comprehensive web" +
        " application that offers information on nearby amusement parks, rich" +
        " social media of visitors' experiences at the parks, and " +
        " descriptions of their host cities.";
    return (
        <PageSection backgroundColor={"#2ec4b6"}
                     color={"#ffffff"}>
          <ParagraphCard header={"We Connect Experiences"}
                         content={description}/>
        </PageSection>
    );
  }
}

export default ProjectDescription;
