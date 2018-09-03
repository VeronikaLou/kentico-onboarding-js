import {
  applyMiddleware,
  createStore
} from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createItems } from './itemsCreator';
import { applicationReducer } from '../reducers/applicationReducer';

const enhancer = composeWithDevTools(
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
