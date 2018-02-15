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
    axios.get('http://parksr.us/api/cities/' + this.state.city.id).then(response => {
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
                </div>
              </PageSection>
              <PageSection header={"Snapshots"}>
                <CardGrid entities={city.photos}
                          endpoint={'photos'}
                          imageHeight={'450px'}/>
              </PageSection>
              <PageSection header={"Nearby Park Attractions"}>
                <Card classes={"CityCard"} key={city.parks[0].id}>
                  <Link to={'/parks/' + city.parks[0].id} className={"CardLink"}>
                    <img src={city.parks[0].image_uri} className="CardImage" style={{height: "500px"}}/>
                    <h1 className={["CardContent", "CardHeader"].join(' ')}>{city.parks[0].name}</h1>
                    <p className={["CardContent", "CardSubtitle"].join(' ')}>{city.parks[0].state}</p>
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

export default CityPage;
