// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './Application';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import { expect, assert } from 'chai';
import { configure, mount, shallow } from 'enzyme';
// importing compenents for all the pages
import SplashPage from './components/Pages/SplashPage/SplashPage';
import NavBar from './components/NavigationBar/NavigationBar'
import AboutPage from './components/Pages/AboutPage/AboutPage';


describe('SplashPage Component', () => {
    const wrapper = shallow(<SplashPage />);
    it('Renders HeroCarousel', () => {
        expect(wrapper.find('HeroCarousel').exists()).to.eql(true);
    });

    it('Renders Carousel items', () => {
        expect(wrapper.find('Hero')).to.length(3);
    });
});

describe('NavigationBar Component', () => {
    const wrapper = shallow(<NavBar />);
    it('Renders Navigation Bar', () => {
        expect(wrapper.find('.NavigationBar').exists()).to.eql(true);
    });

    it('Renders Navigation Bar links', () => {
        expect(wrapper.find('NavItem')).to.length(4);
    });
});

describe('AboutPage Component', () => {
    const wrapper = shallow(<AboutPage />);
    it('Renders Developers', () => {
        expect(wrapper.find('Developers').exists()).to.eql(true);
    });

    it('Renders Project Description', () => {
        expect(wrapper.find('ProjectDescription').exists()).to.eql(true);
    });

    it('Renders Project Statistics', () => {
        expect(wrapper.find('ProjectStatistics').exists()).to.eql(true);
    });

    it('Renders Data Description', () => {
        expect(wrapper.find('DataDescription').exists()).to.eql(true);
    });

    it('Renders Tool Description', () => {
        expect(wrapper.find('ToolDescription').exists()).to.eql(true);
    });

    it('Renders Project Reports', () => {
        expect(wrapper.find('ProjectReports').exists()).to.eql(true);
    });
});
