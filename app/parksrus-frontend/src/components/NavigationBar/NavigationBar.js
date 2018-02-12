import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './NavigationBar.css'

class NavigationBar extends Component {
  render() {
    return (
        <Navbar className="NavigationBar" default collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" id="brand">parksr.us</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <Link to="/about">About</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="/parks">Parks</Link>
              </NavItem>
              <NavItem eventKey={3}>
                <Link to="/cities">Cities</Link>
              </NavItem>
              <NavItem eventKey={4}>
                <Link to="/images">Images</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavigationBar;