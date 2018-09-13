import { combineReducers } from 'redux';
import { items } from './list/items';
import { IStore } from '../store/types/IStore';

export const applicationReducer = combineReducers<IStore>({
  items,
});
