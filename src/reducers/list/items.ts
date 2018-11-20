import { item } from './item';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED, ITEMS_RECEIVED,
} from '../../actions/types/listActionTypes';
import { ListItem } from '../../models/ListItem';
import { IListAction } from '../../actions/types/IListAction';
import { OrderedMap } from 'immutable';
import { ItemsState } from '../../store/types/ItemsState';

export const items = (
  state: ItemsState = OrderedMap(),
  action: IListAction,
): OrderedMap<Uuid, ListItem> => {
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
          item(state.get(action.payload.id), action),
        );

     case ITEMS_RECEIVED:
      return action.payload.items;

    default:
      return state;
  }
};
