import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'

class SnapshotsPage extends React.Component {
  render() {
    return (
        <GridPage endpoint="photos"
                  imageHeight={"450px"}/>
    );
  }
}

export default SnapshotsPage;
