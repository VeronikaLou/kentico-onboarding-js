import { ListItem } from '../../models/ListItem';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
} from '../../actions/types/listActionTypes';

export const item = (state = new ListItem(), action) => {
  switch (action.type) {
    case ITEM_ADDED:
    case ITEM_CHANGES_SAVED:
      return new ListItem({ ...action.payload });

    default:
      return state;
  }
};
