import React, { Component } from 'react';
import './Application.css';

import Page from './components/Page/Page'
import HeroCarousel from './components/HeroCarousel/HeroCarousel'
import Hero from './components/Hero/Hero'

class Application extends Component {
  render() {
    return (
        <div>
          <Page>
            <HeroCarousel>
              <Hero
                  heroUrl="./images/hero_1.jpg"
                  heroHeader="amusement">
              </Hero>
              <Hero
                  heroUrl="./images/hero_2.jpg"
                  heroHeader="travel">
              </Hero>
              {/*<Hero*/}
                  {/*heroUrl="./images/hero_3.jpg"*/}
                  {/*heroHeader="experience">*/}
              {/*</Hero>*/}
            </HeroCarousel>
          </Page>
        </div>
    );
  }
}

export default Application;
