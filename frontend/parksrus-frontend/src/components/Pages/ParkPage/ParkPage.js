import React, { Component } from 'react';
import './ParkPage.css';

import Page from '../../Page/Page'
import axios from 'axios'

import Card from '../../Card/Card'
import PageSection from '../../PageSection/PageSection'
import CardGrid from '../../CardGrid/CardGrid'
import StatisticCard from '../../StatisticCard/StatisticCard'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

const MapMarker = ({text}) => <div className={"MapMarker"}>{text}</div>

class ParkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      park: {
        id: this.props.match.params.id
      },
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.get("http://parksr.us" + '/api/parks/' + this.state.park.id).then(response => {
      console.assert(response.hasOwnProperty('data'));

      this.setState({
        park: response.data,
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
      const park = this.state.park;
      //TODO: Why is parseFloat(park.latitude) evaluating to NaN?
      const location = { lat: parseFloat(park.latitude.valueOf()), lng: parseFloat(park.longitude.valueOf()) };

      // image scaling
      park.image_uri = park.image_uri.split('=')[0] + "=w2000-h500";

      return (
          <div>
            <Page>
              <div className="ParkHero">
                <img src={park.image_uri} className="ParkImage"/>
              </div>
              <div className="ParkTitle">
                <h1>{park.name}</h1>
                <h4>{park.city.name}, {park.city.state}</h4>
              </div>
              <div className="ParkDescription">
                <Panel className="DescriptionPanel">
                  <div className="DescriptionContent">
                    <h1>Address</h1>
                    <p className="DescriptionParagraph">{park.address}</p>
                  </div>
                </Panel>
                <Panel className="DescriptionPanel">

                  <StatisticCard statistic={park.review_data}
                                 description={"Avg. User Rating"} />
                </Panel>
              </div>
              <PageSection header={"Explore the Park"}>
                <div className="MapWrapper">
                  <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBFObWyqlbpObdkdNE0k4JwX9AB66cTGKw"}}
                                  defaultCenter={location}
                                  defaultZoom={15}>
                    <MapMarker lat={location.lat}
                               lng={location.lng}
                               text={""}
                    />
                  </GoogleMapReact>
                </div>
              </PageSection>
              <PageSection header={"Snapshots"}>
                <CardGrid entities={park.snapshots}
                           endpoint={'snapshots'}
                           imageHeight={'450px'}/>
              </PageSection>
              <PageSection header={"Urban Attractions"}>
                <Card className={["SnapshotCity","PageCard"].join(' ')} key={park.city.id}>
                  <Link to={'/cities/' + park.city.id} className={"CardLink"}>
                    <img src={park.city.image_uri} className="CardImage" style={{height: "500px"}}/>
                    <h1 className={["CardContent", "CardHeader"].join(' ')}>{park.city.name}</h1>
                    <p className={["CardContent", "CardSubtitle"].join(' ')}>{park.city.state}</p>
                  </Link>
                </Card>
              </PageSection>
              <PageSection header={"Schedule Your Next Trip"}>
                <Button className="ParkContactButton" href={"tel:" + park.phone_number}>
                  <Glyphicon glyph="phone"/>
                </Button>
                <Button className="ParkContactButton" href={park.website}>
                  <Glyphicon glyph="globe" />
                </Button>
              </PageSection>
            </Page>
          </div>
      );
    } else {
      return <p />
    }
  }
}

export default ParkPage;
