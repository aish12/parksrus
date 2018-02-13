import React, { Component } from 'react';
import './CitiesPage.css';

import Page from '../../Page/Page'
import CitiesGrid from './CitiesGrid/CitiesGrid'
import axios from 'axios'

class CitiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    axios.get('http://parksr.us/api/cities').then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));

      this.setState({
        cities: response.data.objects
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: error
      });
    })
  }

  render() {
    return (
        <div>
          <Page>
            <CitiesGrid cities={this.state.cities}></CitiesGrid>
          </Page>
        </div>
    );
  }
}

export default CitiesPage;
