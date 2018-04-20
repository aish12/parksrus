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
import SearchPage from "./components/Pages/SearchPage/SearchPage";
import SnapshotPage from "./components/Pages/SnapshotPage/SnapshotPage";

// Tests the components for the Splash/Main Page
describe('SplashPage Component', () => {
    const wrapper = shallow(<SplashPage />);
    it('Renders HeroCarousel', () => {
        expect(wrapper.find('HeroCarousel').exists()).to.eql(true);
    });

    it('Renders Carousel items', () => {
        expect(wrapper.find('Hero')).to.length(3);
    });
});

// Tests the components on the Navigation Bar
describe('NavigationBar Component', () => {
    const wrapper = shallow(<NavBar />);
    it('Renders Navigation Bar', () => {
        expect(wrapper.find('.NavigationBar').exists()).to.eql(true);
    });

    it('Renders Navigation Bar links', () => {
        expect(wrapper.find('NavItem')).to.length(5);
    });
});

// Tests the components on the About Page
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

// Tests the Cities GridPage components
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

// Tests the Parks GridPage components
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

    it('Renders Parks Select', () => {
        expect(wrapperP.find('Select')).to.have.length(2);
    });
});

// Tests the Snapshots GridPage components
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
        expect(wrapperS.find('Select').exists()).to.eql(true);
    });
});

// Tests the Search Page components
describe('SearchPage Component', () => {
    const wrapper = shallow(<SearchPage />);

    it('Renders Searchbar', () => {
        expect(wrapper.find('Form').exists()).to.eql(true);
    });

    it('Renders Pagination', () => {
        expect(wrapper.find('Pagination').exists()).to.eql(true);
    });
});
