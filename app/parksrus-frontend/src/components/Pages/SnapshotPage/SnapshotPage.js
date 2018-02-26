import React, { Component } from 'react';
import './SnapshotPage.css';

import Page from '../../Page/Page'
import axios from 'axios'

import Card from '../../Card/Card'
import PageSection from '../../PageSection/PageSection'
import CardGrid from '../../CardGrid/CardGrid'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

class SnapshotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshot: {
        id: this.props.match.params.id
      },
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.get('/api/photos/' + this.state.snapshot.id).then(response => {
      console.assert(response.hasOwnProperty('data'));

      this.setState({
        snapshot: response.data,
        isLoaded: true
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        error: error
      });
    })
  }

  render() {
    if (this.state.isLoaded) {
      const snapshot = this.state.snapshot;
      const location = { lat: parseFloat(snapshot.latitude.valueOf()), lng: parseFloat(snapshot.longitude.valueOf()) };
      return (
          <div>
            <Page>
              <div className="SnapshotHero">
                <img src={snapshot.image_uri} className="SnapshotImage"/>
              </div>
              <div className="SnapshotTitle">
                <h1>{snapshot.city.name}, {snapshot.city.state}</h1>
                <h4>{snapshot.city.country}</h4>
              </div>
              <div className="SnapshotDescription">
                <Panel className="DescriptionPanel">
                  <div className="DescriptionContent">
                    <h1>Hashtags</h1>
                    <p className="DescriptionParagraph">{snapshot.tags}</p>
                  </div>
                </Panel>
              </div>
              <PageSection header={"Map the Experience"}>
                <div className="MapWrapper">
                  <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBFObWyqlbpObdkdNE0k4JwX9AB66cTGKw"}}
                                  defaultCenter={location}
                                  defaultZoom={10} />
                </div>
              </PageSection>
              <PageSection header={"Explore the Park"}>
                <Card classes={"CityCard"} key={snapshot.park.id}>
                  <Link to={'/parks/' + snapshot.park.id} className={"CardLink"}>
                    <img src={snapshot.park.image_uri} className="CardImage" style={{height: "500px"}}/>
                    <h1 className={["CardContent", "CardHeader"].join(' ')}>{snapshot.park.name}</h1>
                    <p className={["CardContent", "CardSubtitle"].join(' ')}>{snapshot.park.state}</p>
                  </Link>
                </Card>
              </PageSection>
              <PageSection header={"Urban Attractions"}>
                <Card classes={"PageCard"} key={snapshot.city.id}>
                  <Link to={'/cities/' + snapshot.city.id} className={"CardLink"}>
                    <img src={snapshot.city.image_uri} className="CardImage" style={{height: "500px"}}/>
                    <h1 className={["CardContent", "CardHeader"].join(' ')}>{snapshot.city.name}</h1>
                    <p className={["CardContent", "CardSubtitle"].join(' ')}>{snapshot.city.state}</p>
                  </Link>
                </Card>
              </PageSection>
            </Page>
          </div>
      );
    } else {
      return <p />
    }
  }
}

export default SnapshotPage;
