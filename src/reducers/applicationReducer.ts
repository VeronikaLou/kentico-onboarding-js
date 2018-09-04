import { combineReducers } from 'redux';
import { items } from './list/items';
import { IStoreState } from '../models/IStoreState';

export const applicationReducer = combineReducers<IStoreState>({
  items,
});
