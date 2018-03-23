import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'

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
    return (
        <GridPage endpoint="cities"
                  page={this.state.page}/>
    );
  }
}

export default CitiesPage;
