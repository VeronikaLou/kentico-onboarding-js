import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { items } from './reducers/items';
import { createItems } from './utils/itemsCreator';

import { App } from './App.jsx';

require.context('../public/', true);

const store = createStore(
  items,
  createItems(),
  applyMiddleware(logger)
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
