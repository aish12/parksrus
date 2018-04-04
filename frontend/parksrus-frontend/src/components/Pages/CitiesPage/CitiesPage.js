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
    let stateOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    let filterables = {
      "state": {
        "multi": true,
        "options": stateOptions,
        "op": "like",
        "field": "state"
      }
    };
    let sortables=['num_parks']
    return (
        <GridPage endpoint="cities"
                  page={this.state.page}
                  filterables={filterables}
                  sortables={sortables}/>
    );
  }
}

export default CitiesPage;
