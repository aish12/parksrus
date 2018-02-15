import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'

class CitiesPage extends React.Component {
  render() {
    return (
        <GridPage endpoint="cities" />
    );
  }
}

export default CitiesPage;
