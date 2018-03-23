import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'

class SnapshotsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.match.params.page || 1
    }
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.setState({'page': props.match.params.page});
  }

  render() {
    return (
        <GridPage endpoint="snapshots"
                  imageHeight={"300px"}
                  page={this.state.page}/>
    );
  }
}

export default SnapshotsPage;
