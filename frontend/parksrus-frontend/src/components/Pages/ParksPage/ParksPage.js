import React, { Component } from 'react';

import states from '../../GridPage/states_list.json'
import GridPage from '../../GridPage/GridPage'

class ParksPage extends React.Component {
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
    let stateOptions = []
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    console.log(stateOptions)
    let filterables = {
      "state": {
        "multi": true,
        "options": stateOptions,
        "op": "like",
        "field": "state"
      }
    }
    return (
        <GridPage endpoint="parks"
                  page={this.state.page}
                  filterables={filterables}
        />
    );
  }
}

export default ParksPage;
