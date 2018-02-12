import React, { Component } from 'react';
import './DataDescription.css';

import DataCard from '../../../DataCard/DataCard'

class DataDescription extends Component {
  render() {
    return (
        <div className="DataDescription">
          <h1 className="ContainerHeader">REST APIs</h1>
          <div className="ContainerContent">
            <DataCard apiName="Twitter"
                      apiDescription="The Twitter Search API enables us to collect
                     social media that provides snapshots of amusement park
                      visitors' experiences."
                      logoUrl="./images/api_logos/twitter.png"
                      apiUrl="https://developer.twitter.com/">
            </DataCard>
            <DataCard apiName="Yelp"
                      apiDescription="Yelp Fusion provides listings and ratings of
                     amusement parks and exciting venues for travelers in
                     cities."
                      logoUrl="./images/api_logos/yelp.png"
                      apiUrl="https://www.yelp.com/fusion">
            </DataCard>
            <DataCard apiName="Google Maps"
                      apiDescription="The Google Maps API allows us to access
                    reviews and geolocation data to identify the most notable
                    amusement parks in the world."
                      logoUrl="./images/api_logos/maps.png"
                      apiUrl="https://developers.google.com/maps/">
            </DataCard>
          </div>
        </div>
    );
  }
}

export default DataDescription;
