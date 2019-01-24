import { combineReducers } from 'redux';
import { items } from './items/items';
import { IStore } from '../store/types/IStore';
import { isFetching } from './isFetching/isFetching';
import { errors } from './errors/errors';
import { fetchingItemsFail } from './fetchingItemsFail/fetchingItemsFail';
import { backupTexts } from './backupTexts/backupTexts';

export const applicationReducer = combineReducers<IStore>({
  items,
  isFetching,
  errors,
  fetchingItemsFail,
  backupTexts,
});
