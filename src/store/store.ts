import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createItems } from './itemsCreator';
import { applicationReducer } from '../reducers/applicationReducer';
import { IStore } from '../store/types/IStore';

const enhancer: StoreEnhancer = composeWithDevTools(
  applyMiddleware(logger),
);

const initialState: IStore = {
  items: createItems(),
};

export const store: Store<IStore> = createStore(
  applicationReducer,
  initialState,
  enhancer,
);
