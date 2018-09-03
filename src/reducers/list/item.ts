import { ListItem } from '../../models/ListItem.tsx';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
} from '../../actions/types/listActionTypes.ts';

export const item = (state = new ListItem(), action) => {
  switch (action.type) {
    case ITEM_ADDED:
    case ITEM_CHANGES_SAVED:
      return new ListItem({ ...action.payload });

    case ITEM_EDITING_MODE_CHANGED:
      return state
        .set('isEdited', !state.isEdited);

    default:
      return state;
  }
};
