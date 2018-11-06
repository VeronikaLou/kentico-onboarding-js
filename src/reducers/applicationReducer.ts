import { combineReducers } from 'redux';
import { items } from './list/items';
import { IStore } from '../store/types/IStore';
import { isFetching } from './list/isFetching';
import { errors } from './list/errors';
import { fetchingItemsFail } from './list/fetchingItemsFail';

export const applicationReducer = combineReducers<IStore>({
  items,
  isFetching,
  errors,
  fetchingItemsFail,
});
