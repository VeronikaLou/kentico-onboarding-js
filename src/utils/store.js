import {
  applyMiddleware,
  createStore,
} from 'redux';
import { logger } from 'redux-logger';
import { createItems } from './itemsCreator';
import { rootReducer } from '../reducers/items';

//
// const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//   }) : compose;
//
// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware),
//   logger
// );

const initialState = {
  items: createItems()
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(logger)
);
