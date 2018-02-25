import React, { Component } from 'react';
import './ToolDescription.css';

import Tools from './Tools'
import PageSection from '../../../PageSection/PageSection';
import SimpleCard from '../../../SimpleCard/SimpleCard';

class ToolDescription extends Component {
  render() {
    const tools = Tools.map((tool =>
            <SimpleCard url={tool.url}
                        header={tool.name}
                        content={tool.description} />
    ));
    return (
        <PageSection header={"Our Tools"}>
          {tools}
        </PageSection>
    );
  }
}

export default ToolDescription;
