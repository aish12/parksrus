import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SplashPage from '../Pages/SplashPage/SplashPage';
import AboutPage from '../Pages/AboutPage/AboutPage';
import ParksPage from '../Pages/ParksPage/ParksPage';
import CitiesPage from '../Pages/CitiesPage/CitiesPage';
import ImagesPage from '../Pages/ImagesPage/ImagesPage';

class Main extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={SplashPage}/>
          <Route path='/about' component={AboutPage}/>
          <Route path='/paths' component={ParksPage}/>
          <Route path='/cities' component={CitiesPage}/>
          <Route path='/images' component={ImagesPage}/>
        </Switch>
    );
  }
}

export default Main;

