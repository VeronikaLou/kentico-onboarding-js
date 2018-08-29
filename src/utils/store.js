import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import { logger } from 'redux-logger';
import { createItems } from './itemsCreator';
import { applicationReducer } from '../reducers/applicationReducer';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(logger)
);

const initialState = {
  items: createItems()
};

export const store = createStore(
  applicationReducer,
  initialState,
  enhancer
);
