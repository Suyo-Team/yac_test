import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import configStore from './reduxSaga/storage'

const store = configStore()

ReactDOM.render(
    <App store={store} />,
  document.getElementById('root')
);
serviceWorker.unregister();
