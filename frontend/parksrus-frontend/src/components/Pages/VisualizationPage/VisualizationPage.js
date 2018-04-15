import React, { Component } from 'react';

import { } from 'react-bootstrap';
import Page from '../../Page/Page'
import axios from 'axios'

class VisualizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      coffeeShops: [],
      scenicLocations: [],
      snapshots: []
    }
  }

  getScenicLocations() {
    return axios.get('http://api.espressoyoself.me/sceniclocations');
  }

  getCoffeeShops() {
    return axios.get('http://api.espressoyoself.me/coffeeshops');
  }

  getSnapshots() {
    return axios.get('http://api.espressoyoself.me/snapshots');
  }

  componentWillMount() {
    const scope = this;
    axios.all([scope.getCoffeeShops(), scope.getScenicLocations(), scope.getSnapshots()])
    .then(axios.spread(function(coffeeShops, scenicLocations, snapshots) {
      scope.setState({
        isLoaded: true,
        coffeeShops: coffeeShops.data,
        scenicLocations: scenicLocations.data,
        snapshots: snapshots.data
      });
    })).catch(function(error) {
      console.error(error);
      scope.setState({
        isLoaded: false,
        error: error
      });
    });
  }

  render() {
    console.log(this.state.coffeeShops, this.state.scenicLocations, this.state.snapshots);
    return <div>
      <Page>

      </Page>
    </div>
  }
}

export default VisualizationPage;