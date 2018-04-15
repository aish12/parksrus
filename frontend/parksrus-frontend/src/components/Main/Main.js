import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SplashPage from '../Pages/SplashPage/SplashPage';
import AboutPage from '../Pages/AboutPage/AboutPage';
import ParksPage from '../Pages/ParksPage/ParksPage';
import ParkPage from '../Pages/ParkPage/ParkPage'
import CitiesPage from '../Pages/CitiesPage/CitiesPage';
import CityPage from '../Pages/CityPage/CityPage'
import SnapshotsPage from '../Pages/SnapshotsPage/SnapshotsPage';
import SnapshotPage from '../Pages/SnapshotPage/SnapshotPage';
import SearchPage from '../Pages/SearchPage/SearchPage';
import VisualizationPage from '../Pages/VisualizationPage/VisualizationPage';

class Main extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/parks/' component={ParksPage} />
          <Route exact path='/cities' component={CitiesPage} />
          <Route exact path='/snapshots' component={SnapshotsPage} />
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/visualization' component={VisualizationPage} />
          <Route path="/parks/pages/:page" component={ParksPage} />
          <Route path="/cities/pages/:page" component={CitiesPage} />
          <Route path="/snapshots/pages/:page" component={SnapshotsPage} />
          <Route path="/search/pages/:page" component={SearchPage} />
          <Route path="/parks/:id" component={ParkPage} />
          <Route path="/cities/:id" component={CityPage} />
          <Route path="/snapshots/:id" component={SnapshotPage} />
        </Switch>
    );
  }
}

export default Main;

