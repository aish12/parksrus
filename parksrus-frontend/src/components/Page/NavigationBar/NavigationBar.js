import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import './NavigationBar.css'

class NavigationBar extends Component {
  render() {
    return (
        <Navbar className="NavigationBar" default collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home" id="brand">parksr.us</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                About
              </NavItem>
              <NavItem eventKey={2} href="#">
                Parks
              </NavItem>
              <NavItem eventKey={3} href="#">
                Cities
              </NavItem>
              <NavItem eventKey={4} href="#">
                Images
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavigationBar;