import { OrderedMap } from 'immutable';
import { combineReducers } from 'redux';
import {
  CHANGES_SAVED,
  EDITING_MODE_CHANGED,
  ITEM_ADDED,
  ITEM_DELETED
} from '../actions/actionTypes';
import { ListItem } from '../models/ListItem';

export const items = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADDED:
      return state.set(action.payload.id, new ListItem({ ...action.payload }));

    case ITEM_DELETED:
      return state.delete(action.payload.id);

    case EDITING_MODE_CHANGED:
      return state.updateIn([action.payload.id, 'isEdited'], isEdited => !isEdited);

    case CHANGES_SAVED:
      return state.mergeIn([action.payload.id], {
        text: action.payload.text,
        isEdited: false
      });

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  items
});
