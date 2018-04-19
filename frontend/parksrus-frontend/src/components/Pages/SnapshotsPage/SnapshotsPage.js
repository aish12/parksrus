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
    const viewBins = [10, 100, 1000, 10000];
    const numTagBins = [1, 2, 4, 6, 8, 10];
    let viewOptions = [];
    let stateOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    viewBins.forEach(bin => {
      viewOptions.push({"value": bin, "label": bin + "+"})
    });
    let filterables = {
      "views": {
        "multi": false,
        "options": viewOptions,
        "op": "gt",
        "field": "views"
      }
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
