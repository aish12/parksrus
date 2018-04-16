import React, { Component } from 'react';

import { } from 'react-bootstrap';
import Page from '../../Page/Page';
import axios from 'axios';

let d3 = require('d3');

class VisualizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      coffeeShops: [],
      scenicLocations: [],
      snapshots: [],
      cities: []
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

  getCities() {
    return axios.get('http://api.espressoyoself.me/getcities');
  }


  componentWillMount() {
    const scope = this;
    axios.all([scope.getCoffeeShops(), scope.getScenicLocations(), scope.getSnapshots(), scope.getCities()])
    .then(axios.spread(function(coffeeShops, scenicLocations, snapshots, cities) {
      scope.setState({
        isLoaded: true,
        coffeeShops: coffeeShops.data,
        scenicLocations: scenicLocations.data,
        snapshots: snapshots.data,
        cities: cities.data
      });
    })).catch(function(error) {
      console.error(error);
      scope.setState({
        isLoaded: false,
        error: error
      });
    });
  }

  getNodes() {
    let nodes = [];
    this.state.coffeeShops.forEach(shop => {
      nodes.push({id: shop.shop_id + "/" + shop.shop_name, group: 1, label: shop.shop_name, level: 2});
    });
    this.state.scenicLocations.forEach(location => {
      nodes.push({id: location.scenic_id + "/" + location.scenic_name, group: 2, label: location.scenic_name, level: 2});
    });
    this.state.snapshots.forEach(snapshot => {
      nodes.push({id: snapshot.snap_id + "/" + snapshot.snap_name, group: 3, label: snapshot.snap_name, level: 2});
    });
    this.state.cities.forEach(city => {
      nodes.push({id: city.city_id, group: 0, label: city.city_name, level: 1});
    });
    nodes.push({id: 0, group: 0, label: "EspressoYoself.me", level: 0});
  }

  getEdges() {
    let edges = [];
    this.state.coffeeShops.forEach(shop => {
      edges.push({target: shop.shop_id + "/" + shop.shop_name, source: shop.city_id, strength: 1});
    });
    this.state.scenicLocations.forEach(location => {
      edges.push({target: location.scenic_id + "/" + location.scenic_name, source: location.city_id, strength: 1});
    });
    this.state.snapshots.forEach(snapshot => {
      edges.push({target: snapshot.snap_id + "/" + snapshot.snap_name, source: snapshot.city_id, strength: 1});
    });
  }

  render() {
    console.log(this.state.coffeeShops, this.state.scenicLocations, this.state.snapshots);
    const width = 1000;
    const height = 1000;
    let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);




    let nodes = this.getNodes();
    let edges = this.getEdges();
    return <div>
      <Page>

      </Page>
    </div>
  }
}

export default VisualizationPage;