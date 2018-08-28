import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { modifyTable } from './reducers/modifyTable';
import { createItems } from './utils/itemsCreator';

import { App } from './App.jsx';

require.context('../public/', true);

const store = createStore(
  modifyTable,
  createItems(),
  applyMiddleware(logger)
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
