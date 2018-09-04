import {
  applyMiddleware,
  createStore, Store, StoreEnhancer,
} from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createItems } from './itemsCreator';
import { applicationReducer } from '../reducers/applicationReducer';
import { IStoreState } from '../models/IStoreState';

const enhancer: StoreEnhancer = composeWithDevTools(
  applyMiddleware(logger),
);

const initialState: IStoreState = {
  items: createItems(),
};

export const store: Store = createStore(
  applicationReducer,
  initialState,
  enhancer,
);
