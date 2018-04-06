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
import { expect, assert, have } from 'chai';
import { configure, mount, shallow } from 'enzyme';
// importing compenents for all the pages
import SplashPage from './components/Pages/SplashPage/SplashPage';
import NavBar from './components/NavigationBar/NavigationBar'
import AboutPage from './components/Pages/AboutPage/AboutPage';
import states from './components/GridPage/states_list';
import GridPage from './components/GridPage/GridPage';


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

describe('Cities GridPage Component', () => {
    let stateOptions = [];
    states.forEach(state => {
        stateOptions.push({"value": state, "label": state})
    });

    let filterables = {
        "state": {
            "multi": true,
            "options": stateOptions,
            "op": "like",
            "field": "state"
        }
    };
    let sortables=['num_parks']
    const wrapperC = shallow(<GridPage endpoint={"cities"} page={1} filterables={filterables} sortables={sortables} />);

    it('Renders Cities CardGrid', () => {
        expect(wrapperC.find('CardGrid').exists()).to.eql(true);
    });

    it('Renders Cities Pagination', () => {
        expect(wrapperC.find('Pagination').exists()).to.eql(true);
    });
    it('Renders Cities Select', () => {
        expect(wrapperC.find('Select')).to.have.length(2);
    });
});

describe('Parks GridPage Component', () => {
    let stateOptions = [];
    states.forEach(state => {
        stateOptions.push({"value": state, "label": state})
    });

    let filterables = {
        "state": {
            "multi": true,
            "options": stateOptions,
            "op": "like",
            "field": "state"
        }
    };
    let sortables = ['review_data'];
    const wrapperP = shallow(<GridPage endpoint={"parks"} page={1} filterables={filterables} sortables={sortables} />);

    it('Renders Parks CardGrid', () => {
        expect(wrapperP.find('Select')).to.have.length(2);
    });

    it('Renders Parks Pagination', () => {
        expect(wrapperP.find('Pagination').exists()).to.eql(true);
    });

    it('Renders Snapshots Select', () => {
        expect(wrapperP.find('Select').exists()).to.eql(true);
    });
});

describe('Snapshots GridPage Component', () => {
    let stateOptions = [];
    states.forEach(state => {
        stateOptions.push({"value": state, "label": state})
    });
    let filterables = {};
    let sortables=['views'];

    const wrapperS = shallow(<GridPage endpoint={"snapshots"} page={1} filterables={filterables} sortables={sortables} />);

    it('Renders Snapshots CardGrid', () => {
        expect(wrapperS.find('CardGrid').exists()).to.eql(true);
    });

    it('Renders Snapshots Pagination', () => {
        expect(wrapperS.find('Pagination').exists()).to.eql(true);
    });

    it('Renders Snapshots Select', () => {
        expect(wrapperS.find('Select').hasClass('Sort')).to.eql(true);
    });
});
