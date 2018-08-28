import { OrderedMap } from 'immutable';
import {
  CHANGES_SAVED,
  EDITING_MODE_CHANGED,
  ITEM_ADDED,
  ITEM_DELETED
} from '../actions/actionTypes';
import { ListItem } from '../models/ListItem';

export const modifyTable = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADDED:
      return state.set(action.id, new ListItem({ ...action }));
    case ITEM_DELETED:
      return state.delete(action.id);
    case EDITING_MODE_CHANGED:
      return state.updateIn([action.id, 'isEdited'], isEdited => !isEdited);
    case CHANGES_SAVED:
      return state.mergeIn([action.id], {
        text: action.text,
        isEdited: false
      });
    default:
      return state;
  }
};
