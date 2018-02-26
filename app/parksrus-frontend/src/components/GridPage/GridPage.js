import React, { Component } from 'react';
import './GridPage.css';

import Page from '../Page/Page'
import CardGrid from '../CardGrid/CardGrid'
import axios from 'axios'

class GridPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      endpoint: this.props.endpoint,
      apiPath: "/api/" + this.props.endpoint,
      imageHeight: this.props.imageHeight
    }
  }

  componentDidMount() {
    axios.get(this.state.apiPath).then(response => {
      console.assert(response.hasOwnProperty('data'));
      console.assert(response.data.hasOwnProperty('objects'));

      this.setState({
        entities: response.data.objects
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: error
      });
    })
  }

  render() {
    let endpoint = this.state.endpoint;
    //TODO: Rename photos endpoint to snapshots for consistency.
    if (endpoint === 'photos') {
      endpoint = 'snapshots'
    }
    return (
        <div>
          <Page>
            <CardGrid entities={this.state.entities}
                      endpoint={endpoint}
                      imageHeight={this.state.imageHeight}/>
          </Page>
        </div>
    );
  }
}

export default GridPage;
