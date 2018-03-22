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
import AboutPage from './components/Pages/AboutPage/AboutPage';

describe('AboutPage Component', () => {
    // TODO: fix token syntaxerror; jsx not recognized
    const wrapper = shallow(<AboutPage />);
    it('Renders About Page without issue', () => {
        expect(wrapper.find('Developers'));
    });
});