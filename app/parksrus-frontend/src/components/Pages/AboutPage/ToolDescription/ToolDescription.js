import React, { Component } from 'react';
import './ToolDescription.css';

import DataCard from '../../../DataCard/DataCard'

class ToolDescription extends Component {
  render() {
    return (
        <div className="ToolDescription">
          <h1 className="ContainerHeader">Our Tools</h1>
          <div id="ToolContent" className="ContainerContent">
            <DataCard apiName="Flask"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="React-Bootstrap"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="React"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="Amazon AWS EC2"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="TravisCI"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="Nginx"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="Gunicorn"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
            <DataCard apiName="Create-React-App"
                      apiDescription=""
                      logoUrl=""
                      apiUrl="">
            </DataCard>
          </div>
        </div>
    );
  }
}

export default ToolDescription;
