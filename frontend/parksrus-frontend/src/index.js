import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
      <Application />
    </BrowserRouter>,

    document.getElementById('root'));
registerServiceWorker();
