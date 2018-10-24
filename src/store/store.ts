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
import thunk from 'redux-thunk';
import { ListError } from '../models/ListError';

const enhancer: StoreEnhancer = composeWithDevTools(
  applyMiddleware(logger, thunk),
);

const initialState: IStore = {
  items: OrderedMap<Uuid, ListItem>(),
  isFetching: false,
  errors: OrderedMap<Uuid, ListError>(),
};

export const store: Store<IStore> = createStore(
  applicationReducer,
  initialState,
  enhancer,
);
