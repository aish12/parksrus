import React, { Component } from 'react';
import './PageSection.css';

class PageSection extends Component {
  render() {
    const color = this.props.hasOwnProperty('color') ? this.props.color : "black";
    const backgroundColor = this.props.hasOwnProperty('backgroundColor') ? this.props.backgroundColor : "#ffffff";
    return (
        <div className="PageSection" style={{"background-color": backgroundColor}}>
          {this.props.header && <h1 className="SectionHeader" style={{"color": color}}>{this.props.header}</h1>}
          <div className="SectionContent">
            {this.props.children}
          </div>
        </div>
    );
  }
}

export default PageSection;
