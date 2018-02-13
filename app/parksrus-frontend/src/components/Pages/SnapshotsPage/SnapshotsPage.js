import React, { Component } from 'react';
import './SnapshotsPage.css';

import Page from '../../Page/Page'
import SnapshotsGrid from './SnapshotsGrid/SnapshotsGrid'
import axios from 'axios'

class SnapshotsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshots: []
    }
  }

  componentDidMount() {
    axios.get('http://parksr.us/api/photos').then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));

      this.setState({
        snapshots: response.data.objects
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
            <SnapshotsGrid snapshots={this.state.snapshots}></SnapshotsGrid>
          </Page>
        </div>
    );
  }
}

export default SnapshotsPage;
