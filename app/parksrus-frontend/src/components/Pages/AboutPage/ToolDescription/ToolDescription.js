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
                      apiDescription="Web Server"
                      logoUrl=""
                      apiUrl="http://flask.pocoo.org">
            </DataCard>
            <DataCard apiName="React-Bootstrap"
                      apiDescription="Component Framework"
                      logoUrl=""
                      apiUrl="http://react-bootstrap.github.io">
            </DataCard>
            <DataCard apiName="React"
                      apiDescription="UI Framework"
                      logoUrl=""
                      apiUrl="http://reactjs.org">
            </DataCard>
            <DataCard apiName="Amazon AWS EC2"
                      apiDescription="Server Hosting"
                      logoUrl=""
                      apiUrl="http://aws.amazon.com/ec2">
            </DataCard>
            <DataCard apiName="TravisCI"
                      apiDescription="Continuous Integration"
                      logoUrl=""
                      apiUrl="http://travis-ci.org">
            </DataCard>
            <DataCard apiName="Nginx"
                      apiDescription="Reverse-Proxy"
                      logoUrl=""
                      apiUrl="http://nginx.com">
            </DataCard>
            <DataCard apiName="Gunicorn"
                      apiDescription="WSGI HTTP Server"
                      logoUrl=""
                      apiUrl="http://gunicorn.org">
            </DataCard>
            <DataCard apiName="Create-React-App"
                      apiDescription="React Scaffolding"
                      logoUrl=""
                      apiUrl="http://github.com/facebook/create-react-app">
            </DataCard>
            <DataCard apiName="Postman"
                      apiDescription="RESTful Client"
                      logoUrl=""
                      apiUrl="https://www.getpostman.com/">

            </DataCard>
            <DataCard apiName="Slack"
                      apiDescription="Real-time Communication"
                      logoUrl=""
                      apiUrl="http://slack.com">

            </DataCard>
            <DataCard apiName="NameCheap"
                      apiDescription="Domain Name Registrar"
                      logoUrl=""
                      apiUrl="http://namecheap.com">

            </DataCard>
          </div>
        </div>
    );
  }
}

export default ToolDescription;
