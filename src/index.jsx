import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { modifyTable } from './reducers/reducers';
import { createItems } from './utils/itemsCreator';

import { App } from './App.jsx';

require.context('../public/', true);

ReactDom.render(
  <Provider store={createStore(modifyTable, createItems())}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
