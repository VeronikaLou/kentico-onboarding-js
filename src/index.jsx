import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';

import { App } from './App.jsx';

require.context('../public/', true);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
