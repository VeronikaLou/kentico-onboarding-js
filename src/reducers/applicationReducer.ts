import { combineReducers } from 'redux';
import { items } from './list/items';
import { IStore } from '../store/types/IStore';
import { isFetching } from './list/isFetching';

export const applicationReducer = combineReducers<IStore>({
  items,
  isFetching,
});
