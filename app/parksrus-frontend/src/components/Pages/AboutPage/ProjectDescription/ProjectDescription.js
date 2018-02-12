import React, { Component } from 'react';
import './ProjectDescription.css'

import { Panel } from 'react-bootstrap'

class ProjectDescription extends Component {
  render() {
    return (
        <div className="ProjectDescription">
          <div className="Container">
            <Panel className="Panel">
              <h1 className="DescriptionHeader">The Project</h1>
              <p className="Description">Our platform, <b>parksr.us</b>, aims to connect theme park enthusiasts,
                trendy urbanites, and travel aficionados through a comprehensive
                web application that offers information on nearby amusement parks,
                rich social media of visitors' experiences at the parks, and
                descriptions of their host cities.</p>
            </Panel>
          </div>
        </div>
    );
  }
}

export default ProjectDescription;
