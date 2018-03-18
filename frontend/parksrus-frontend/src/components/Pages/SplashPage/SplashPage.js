import React, { Component } from 'react';
import './SplashPage.css';

import Page from '../../Page/Page'
import HeroCarousel from '../../HeroCarousel/HeroCarousel'
import Hero from '../../Hero/Hero'

class SplashPage extends Component {
  render() {
    return (
        <div>
          <Page>
            <HeroCarousel>
              <Hero
                  heroUrl="./images/heroes/hero_1.jpg"
                  heroHeader="travel">
              </Hero>
              <Hero
                  heroUrl="./images/heroes/hero_2.jpg"
                  heroHeader="amusement">
              </Hero>
              <Hero
                  heroUrl="./images/heroes/hero_3.jpg"
                  heroHeader="experience">
              </Hero>
            </HeroCarousel>
          </Page>
        </div>
    );
  }
}

export default SplashPage;
