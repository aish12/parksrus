import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './PageFooter.css';

class PageFooter extends Component {
  render() {
    return (
        <div className="PageFooter">
          @ 2018 <Link to="/about">Winter is Not Coming</Link>
        </div>
    );
  }
}

export default PageFooter;
