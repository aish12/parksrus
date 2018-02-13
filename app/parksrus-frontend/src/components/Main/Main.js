import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SplashPage from '../Pages/SplashPage/SplashPage';
import AboutPage from '../Pages/AboutPage/AboutPage';
import ParksPage from '../Pages/ParksPage/ParksPage';
import CitiesPage from '../Pages/CitiesPage/CitiesPage';
import SnapshotsPage from '../Pages/SnapshotsPage/SnapshotsPage';

class Main extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={SplashPage}/>
          <Route path='/about' component={AboutPage}/>
          <Route path='/parks' component={ParksPage}/>
          <Route path='/cities' component={CitiesPage}/>
          <Route path='/snapshots' component={SnapshotsPage}/>
        </Switch>
    );
  }
}

export default Main;

