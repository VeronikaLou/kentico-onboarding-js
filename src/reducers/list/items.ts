import { item } from './item';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED,
} from '../../actions/types/listActionTypes';
import { Uuid } from '../../utils/generateId';
import { ListItem } from '../../models/ListItem';
import { IListAction } from '../../actions/IListAction';
import { OrderedMap } from 'immutable';

export const items = (state: OrderedMap<Uuid, ListItem> = OrderedMap(), action: IListAction): OrderedMap<Uuid, ListItem> => {
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

    default:
      return state;
  }
};
