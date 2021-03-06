import React, { Component } from 'react';
import './SnapshotPage.css';

import Page from '../../Page/Page'
import axios from 'axios'

import Card from '../../Card/Card'
import PageSection from '../../PageSection/PageSection'
import CardGrid from '../../CardGrid/CardGrid'
import { Panel, Button, Glyphicon, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

const MapMarker = ({text}) => <div className={"MapMarker"}>{text}</div>

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
    axios.get("http://parksr.us" + '/api/snapshots/' + this.state.snapshot.id).then(response => {
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

  getBadgeColorClassName() {
    const badgeClasses = ['OrangeBadge', 'RedBadge', 'BlueBadge'];
    return badgeClasses[Math.floor(Math.random() * badgeClasses.length)];
  }

  render() {
    if (this.state.isLoaded) {
      let FLICKR_BASE = "https://www.flickr.com/search/?text=";
      const snapshot = this.state.snapshot;
      const location = { lat: parseFloat(snapshot.latitude.valueOf()), lng: parseFloat(snapshot.longitude.valueOf()) };

      console.log(location)
      //image scaling
      snapshot.image_uri = snapshot.image_uri.split('=')[0] + "=w2000-h500";
      let hashtags = snapshot.tags.split(',').map(hashtag => <a href={FLICKR_BASE + hashtag}><Badge className={this.getBadgeColorClassName()}>{"#" + hashtag}</Badge></a>);
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
                    <h1>#Hashtags</h1>
                    <p className="DescriptionParagraph">{hashtags}</p>
                  </div>
                </Panel>
              </div>
              <PageSection header={"Map the Experience"}>
                <div className="MapWrapper">
                  <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBFObWyqlbpObdkdNE0k4JwX9AB66cTGKw"}}
                                  defaultCenter={location}
                                  defaultZoom={15} />
                    {/*<MapMarker lat={location.lat}*/}
                               {/*lng={location.lng}*/}
                               {/*text={""}*/}
                    {/*/>*/}
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
                <Card className={["SnapshotCity","PageCard"].join(' ')} key={snapshot.city.id}>
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
