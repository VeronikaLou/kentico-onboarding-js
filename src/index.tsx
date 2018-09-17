import '../node_modules/bootstrap/dist/css/bootstrap.css';
import * as ReactDom from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { App } from './components/App';

require.context('../public/', true);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
