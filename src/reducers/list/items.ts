import { OrderedMap } from 'immutable';
import { item } from './item';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED
} from '../../actions/types/listActionTypes.ts';

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
        .set(
          action.payload.id,
          item(state.get(action.payload.id), action)
        );

    default:
      return state;
  }
};
