// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './Application';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from './parksrus-frontend/node_modules/react';
import { expect, assert } from './parksrus-frontend/node_modules/chai';
import { configure, mount, shallow } from 'enzyme';
import AboutPage from './parksrus-frontend/src/components/Pages/AboutPage/AboutPage';
import Adapter from './parksrus-frontend/node_modules/enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('AboutPage Component', () => {
    // TODO: fix token syntaxerror; jsx not recognized
    const wrapper = shallow(<AboutPage />);
    it('Renders About Page without issue', () => {
        expect(wrapper.find('Developers'));
    });
});
