import React, { Component } from 'react';
import './DataDescription.css';

import DataSources from './DataSources'
import PageSection from '../../../PageSection/PageSection';
import SimpleCard from '../../../SimpleCard/SimpleCard';

class DataDescription extends Component {
  render() {
    const sources = DataSources.map((source =>
      <SimpleCard url={source.url}
                  header={source.name}
                  content={source.description} />
    ));
    return (
      <PageSection backgroundColor={"#e71d36"}
                   color={"#ffffff"}
                   header={"REST APIs"}>
        {sources}
      </PageSection>
    );
  }
}

export default DataDescription;
