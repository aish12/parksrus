import React, { Component } from 'react';
import './AboutPage.css';

import Page from '../../Page/Page'
import DeveloperCard from '../../DeveloperCard/DeveloperCard'

class AboutPage extends Component {
  render() {
    return (
        <div>
          <Page className="Page">
            <DeveloperCard avatarUrl="./images/avatars/aish.jpg"
              name="Aishwarya Shashidhar"
              bio="Aish Shashidhar is a Junior majoring in Computer Science
              at The University of Texas at Austin. She loves hiking and
              teaching, and is also a henna artist. "
              responsibilities="Back-End Developer"
              commits={6}
              unittests={7}
              issues={8}
            > </DeveloperCard>
            <DeveloperCard avatarUrl="./images/avatars/ben.jpg"
               name="Benjamin Chen"
               bio="Benjamin Chen is Junior majoring in Computer
                Science at UT Austin. His interests outside of
                academics include videogames and fishing. "
               responsibilities="Front-End Developer"
               commits={6}
               unittests={7}
               issues={8}
            > </DeveloperCard>
            <DeveloperCard avatarUrl="./images/avatars/daniel.jpg"
                           name="Daniel Zheng"
                           bio=""
                           responsibilities="Developer"
                           commits={6}
                           unittests={7}
                           issues={8}
            > </DeveloperCard>
            <DeveloperCard avatarUrl="./images/avatars/denalex.jpg"
              name="Denalex Orakwue"
              bio="Denalex Orakwue is a Junior majoring in Computer Science
               at The University of Texas at Austin. "
              responsibilities="Back-End Developer"
              commits={6}
              unittests={7}
              issues={8}
            > </DeveloperCard>
            <DeveloperCard avatarUrl="./images/avatars/trenton.jpg"
               name="Trenton Beckendorff"
               bio="Trenton Beckendorff is an emerging technologist
               pursuing a degree in Computer Science from The University
               of Texas at Austin.
  "
               responsibilities="Front-End Developer"
               commits={6}
               unittests={7}
               issues={8}
            >

            </DeveloperCard>
            <p className="ProjectDescription"></p>
          </Page>
        </div>
    );
  }
}

export default AboutPage;
