import React, { Component } from 'react';

import GridPage from '../../GridPage/GridPage'

class ParksPage extends React.Component {
  render() {
    return (
        <GridPage endpoint="parks" />
    );
  }
}

export default ParksPage;
