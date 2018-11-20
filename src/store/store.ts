import {
  applyMiddleware,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applicationReducer } from '../reducers/applicationReducer';
import { IStore } from './types/IStore';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

const enhancer: StoreEnhancer = composeWithDevTools(
  applyMiddleware(logger),
);

const initialState: IStore = {
  items: OrderedMap<Uuid, ListItem>(),
  isFetching: false,
};

export const store: Store<IStore> = createStore(
  applicationReducer,
  initialState,
  enhancer,
);
