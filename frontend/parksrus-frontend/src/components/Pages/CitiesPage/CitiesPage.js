import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'
import states from '../../GridPage/states_list.json'

class CitiesPage extends React.Component {
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

  componentDidUpdate(props) {

  }

  render() {
    const numParksBins = [1, 5, 10, 15, 20];
    let stateOptions = [];
    let numParksOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    numParksBins.forEach(bin => {
      numParksOptions.push({"value": bin, "label": bin + "+"})
    });
    let filterables = {
      "state": {
        "multi": false,
        "options": stateOptions,
        "op": "like",
        "field": "state"
      },
      "num_parks": {
        "multi": false,
        "options": numParksOptions,
        "op": "gt",
        "field": "num_parks"
      }
    };
    let sortables=['num_parks', 'state', 'name', 'country']
    return (
        <GridPage endpoint="cities"
                  page={this.state.page}
                  filterables={filterables}
                  sortables={sortables}/>
    );
  }
}

export default CitiesPage;
