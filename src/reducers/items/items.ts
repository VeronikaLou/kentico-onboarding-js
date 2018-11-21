import { item } from './item';
import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_EDITING_MODE_CHANGE,
  ITEM_SAVE_FAIL,
  ITEM_SAVE_REQUEST,
  ITEM_SAVE_SUCCESS,
  ITEMS_FETCH_SUCCESS,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';
import { OrderedMap } from 'immutable';
import { ItemsState } from '../../store/types/ItemsState';

export const items = (
  state: ItemsState = OrderedMap(),
  action: IListAction,
): ItemsState => {
  switch (action.type) {
    case ITEM_DELETE_SUCCESS:
    case CLOSE_ADD_ERROR:
      return state
        .delete(action.payload.id);

    case ITEMS_FETCH_SUCCESS:
      return action.payload.items;

    case ITEM_ADD_SUCCESS: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state
        .set(
          action.payload.fetchedId,
          updatedItem,
        )
        .delete(action.payload.id);
    }

    case ITEM_ADD_REQUEST:
    case ITEM_SAVE_REQUEST:
    case CLOSE_SAVE_ERROR: {
      const updatedItem = item(undefined, action);

      return state
        .set(action.payload.id, updatedItem);
    }

    case ITEM_SAVE_FAIL:
    case ITEM_ADD_FAIL:
    case ITEM_DELETE_FAIL:
    case ITEM_DELETE_REQUEST:
    case ITEM_EDITING_MODE_CHANGE:
    case ITEM_SAVE_SUCCESS:
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
