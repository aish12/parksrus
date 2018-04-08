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
    let viewBins = [10, 100, 1000, 10000]
    let viewOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    viewBins.forEach(bin => {
      viewOptions.push({"value": bin, "label": bin})
    });
    let filterables = {
      "views": {
        "multi": true,
        "options": viewOptions,
        "op": "gt",
        "field": "views"
      },
    };
    let sortables=['views', 'state', 'country'];
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
