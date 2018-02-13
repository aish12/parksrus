import React, { Component } from 'react';
import './ParksPage.css';

import Page from '../../Page/Page'
import ParksGrid from './ParksGrid/ParksGrid'
import axios from 'axios'

class ParksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: []
    }
  }

  componentDidMount() {
    axios.get('http://parksr.us/api/parks').then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));

      this.setState({
        parks: response.data.objects
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
            <ParksGrid parks={this.state.parks}></ParksGrid>
          </Page>
        </div>
    );
  }
}



export default ParksPage;
