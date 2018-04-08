import React, { Component } from 'react';

import cities from '../../GridPage/cities.json'
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
    let cityOptions = [];
    let stateOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    cities.forEach(city => {
      cityOptions.push({"value": city, "label": city})
    })

    console.log(stateOptions);
    let filterables = {
      "state": {
        "multi": true,
        "options": stateOptions,
        "op": "like",
        "field": "state"
      },
      "city": {
        "multi": true,
        "options": cityOptions,
        "op": "has",
        "field": "city"
      }
    };
    let sortables = ['review_data', 'state', 'name', 'country'];
    return (
        <GridPage endpoint="parks"
                  page={this.state.page}
                  filterables={filterables}
                  sortables={sortables}
        />
    );
  }
}

export default ParksPage;
