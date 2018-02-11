import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import '../node_modules/grommet/scss/vanilla/index.scss'
import Carousel from 'grommet/components/Carousel'
import Image from 'grommet/components/Image'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Anchor from 'grommet/components/Anchor'

class App extends Component {
  render() {
    return (
      <Article className="App">
        <Header>
          <Title>
            parksr.us
          </Title>
          <Box flex={true}
               justify='end'
               direction='row'
               responsive={false}>
          </Box>
          <Anchor label="About" href=""/>
          <Anchor label="Parks" href=""/>
          <Anchor label="Cities" href=""/>
          <Anchor label="Images" href=""/>
        </Header>
        <Carousel className="App-content">
          <Image src="images/hero_1.jpg" />
          <Image src="images/hero_2.jpg" />
          <Image src="images/hero_3.jpg" />
        </Carousel>
      </Article>
    );
  }
}

export default App;
