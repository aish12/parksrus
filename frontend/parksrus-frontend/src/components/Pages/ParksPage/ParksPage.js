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
    const reviewBins = [1, 2, 3, 4, 5];
    let cityOptions = [];
    let stateOptions = [];
    let reviewOptions = [];
    states.forEach(state => {
      stateOptions.push({"value": state, "label": state})
    });
    cities.forEach(city => {
      cityOptions.push({"value": city, "label": city})
    });
    reviewBins.forEach(bin => {
      reviewOptions.push({"value": "" + bin , "label": bin + "+"})
    });

    console.log(stateOptions);
    let filterables = {
      "state": {
        "multi": false,
        "options": stateOptions,
        "op": "like",
        "field": "state"
      },
      "city": {
        "multi": false,
        "options": cityOptions,
        "op": "has",
        "field": "city"
      },
      "review_data": {
        "multi": false,
        "options": reviewOptions,
        "op": ">=",
        "field": "review_data"
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
