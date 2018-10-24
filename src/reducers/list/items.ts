import { item } from './item';
import {
  CLOSE_ADD_ERROR, CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUESTED,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUESTED,
  ITEM_DELETE_SUCCESS,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_SAVE_FAIL,
  ITEM_SAVE_REQUESTED,
  ITEM_SAVE_SUCCESS,
  ITEMS_RECEIVE_SUCCESS,
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

    case ITEMS_RECEIVE_SUCCESS:
      return action.payload.items;

    case ITEM_ADD_SUCCESS:
      return state
        .set(
          action.payload.fetchedId,
          item(state.get(action.payload.id), action))
        .delete(action.payload.id);

    case ITEM_ADD_REQUESTED:
    case ITEM_SAVE_REQUESTED:
    case CLOSE_SAVE_ERROR:
      return state
        .set(action.payload.id, item(undefined, action));

    case ITEM_SAVE_FAIL:
    case ITEM_ADD_FAIL:
    case ITEM_DELETE_FAIL:
    case ITEM_DELETE_REQUESTED:
    case ITEM_EDITING_MODE_CHANGED:
    case ITEM_SAVE_SUCCESS:
    case CLOSE_DELETE_ERROR:
      return state
        .set(
          action.payload.id,
          item(state.get(action.payload.id), action),
        );

    default:
      return state;
  }
};
