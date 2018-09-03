import { OrderedMap } from 'immutable';
import { item } from './item';
import {
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_ADDED,
  ITEM_DELETED
} from '../../actions/types/listActionTypes';

export const items = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADDED:
    case ITEM_CHANGES_SAVED:
      return state
        .set(action.payload.id, item(undefined, action));

    case ITEM_DELETED:
      return state
        .delete(action.payload.id);

    case ITEM_EDITING_MODE_CHANGED:
      return state
        .updateIn([action.payload.id, 'isEdited'], isEdited => !isEdited);

    default:
      return state;
  }
};
