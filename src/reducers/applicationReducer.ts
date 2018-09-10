import { combineReducers } from 'redux';
import { items } from './list/items';
import { IStore } from '../models/IStore';

export const applicationReducer = combineReducers<IStore>({
  items,
});
