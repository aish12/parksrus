import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'
import states from '../../GridPage/states_list.json'

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
    let stateOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    let filterables = {};
    let sortables=['views'];
    return (
        <GridPage endpoint="snapshots"
                  //imageHeight={"300px"}
                  page={this.state.page}
                  filterables={filterables}
                  sortables={sortables}/>
    );
  }
}

export default SnapshotsPage;
