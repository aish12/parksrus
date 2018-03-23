import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter } from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
      <Application />
    </HashRouter>,

    document.getElementById('root'));
registerServiceWorker();
