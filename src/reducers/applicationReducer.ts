import { combineReducers } from 'redux';
import { items } from './items/items';
import { IStore } from '../store/types/IStore';
import { fetchingItemsFail } from './fetchingItemsFail/fetchingItemsFail';
import { isFetching } from './isFetching/isFetching';

export const applicationReducer = combineReducers<IStore>({
  items,
  isFetching,
  fetchingItemsFail,
});
