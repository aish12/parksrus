import React, { Component } from 'react';
import './CityPage.css';

import Page from '../../Page/Page'
import axios from 'axios'

import Card from '../../Card/Card'
import PageSection from '../../PageSection/PageSection'
import CardGrid from '../../CardGrid/CardGrid'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

const MapMarker = ({text}) => <div className={"MapMarker"}>{text}</div>

class CityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: {
        id: this.props.match.params.id
      },
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.get("http://parksr.us" + '/api/cities/' + this.state.city.id).then(response => {
      console.assert(response.hasOwnProperty('data'));

      this.setState({
        city: response.data,
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
      const city = this.state.city;
      const location = { lat: parseFloat(city.latitude.valueOf()), lng: parseFloat(city.longitude.valueOf()) };
      //image scaling
      city.image_uri = city.image_uri.split('=')[0] + "=w2000-h500";
      return (
          <div>
            <Page>
              <div className="CityHero">
                <img src={city.image_uri} className="CityImage"/>
              </div>
              <div className="CityTitle">
                <h1>{city.name}, {city.state}</h1>
                <h4>{city.country}</h4>
              </div>
              <div className="CityDescription">
                <Panel className="DescriptionPanel">
                  <div className="DescriptionContent">
                    <h1>About the City</h1>
                    <p className="DescriptionParagraph">{city.description}</p>
                  </div>
                </Panel>
              </div>
              <PageSection header={"Explore the City"}>
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
              <PageSection header={"Snapshots"}>
                <CardGrid entities={city.snapshots}
                          endpoint={'snapshots'}/>
              </PageSection>
              <PageSection header={"Nearby Park Attractions"}>
                <CardGrid entities={city.parks}
                          endpoint={'parks'}/>
              </PageSection>
            </Page>
          </div>
      );
    } else {
      return <p />
    }
  }
}

export default CityPage;
