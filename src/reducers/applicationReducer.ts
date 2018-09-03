import { combineReducers } from 'redux';
import { items } from './list/items';

export const applicationReducer = combineReducers({
  items
});
