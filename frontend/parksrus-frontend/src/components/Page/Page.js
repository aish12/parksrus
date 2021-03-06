import React, { Component } from 'react';
import './Page.css';

import PageFooter from './PageFooter/PageFooter'

class Page extends Component {
  render() {
    return (
        <div className="Page">
          <div className="PageContent">{this.props.children}</div>
          <PageFooter></PageFooter>
        </div>
    );
  }
}

export default Page;
