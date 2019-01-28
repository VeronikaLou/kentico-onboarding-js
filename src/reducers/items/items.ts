import { item } from './item';
import {
  ITEM_ADD_STARTED,
  ITEM_ADD_SUCCEEDED,
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED,
  ITEMS_FETCH_SUCCEEDED,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';
import { OrderedMap } from 'immutable';
import { ItemsState } from '../../store/types/ItemsState';

export const items = (
  state: ItemsState = OrderedMap(),
  action: IListAction,
): ItemsState => {
  switch (action.type) {
    case ITEMS_FETCH_SUCCEEDED:
      return action.payload.items;

    case ITEM_ADD_SUCCEEDED: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state
        .set(updatedItem.id, updatedItem)
        .delete(action.payload.id);
    }

    case ITEM_ADD_STARTED:
    case ITEM_CHANGES_SAVED: {
      const updatedItem = item(undefined, action);

      return state.set(action.payload.id, updatedItem);
    }

    case ITEM_DELETED:
      return state.delete(action.payload.id);

    case ITEM_EDITING_MODE_CHANGED: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state.set(action.payload.id, updatedItem);
    }

    default:
      return state;
  }
};
