import { item } from './item';
import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAILED,
  ITEM_ADD_STARTED,
  ITEM_ADD_SUCCEEDED,
  ITEM_DELETE_FAILED,
  ITEM_DELETE_STARTED,
  ITEM_DELETE_SUCCEEDED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_SAVE_FAILED,
  ITEM_SAVE_STARTED,
  ITEM_SAVE_SUCCEEDED,
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
    case ITEM_DELETE_SUCCEEDED:
    case CLOSE_ADD_ERROR:
      return state
        .delete(action.payload.id);

    case ITEMS_FETCH_SUCCEEDED:
      return action.payload.items;

    case ITEM_ADD_SUCCEEDED: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state
        .set(
          action.payload.fetchedId,
          updatedItem,
        )
        .delete(action.payload.id);
    }

    case ITEM_ADD_STARTED:
    case ITEM_SAVE_STARTED:
    case CLOSE_SAVE_ERROR: {
      const updatedItem = item(undefined, action);

      return state
        .set(action.payload.id, updatedItem);
    }

    case ITEM_SAVE_FAILED:
    case ITEM_ADD_FAILED:
    case ITEM_DELETE_FAILED:
    case ITEM_DELETE_STARTED:
    case ITEM_EDITING_MODE_CHANGED:
    case ITEM_SAVE_SUCCEEDED:
    case CLOSE_DELETE_ERROR: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state
        .set(
          action.payload.id,
          updatedItem,
        );
    }

    default:
      return state;
  }
};
