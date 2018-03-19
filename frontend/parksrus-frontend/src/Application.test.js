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
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import App from './Application';

const wrapper = shallow(<App />);
describe('App Component', () => {
  // TODO: add tests here; this doesn't do anything yet
  it('renders title', () => {
        expect(wrapper.find('title').text()).toEqual('parksr.us');
    });
});
