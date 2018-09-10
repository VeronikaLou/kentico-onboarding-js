import { ListItem } from '../../models/ListItem';
import {
  ITEM_ADDED,
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';

export const item = (state: ListItem = new ListItem(), action: IListAction): ListItem => {
  switch (action.type) {
    case ITEM_ADDED:
    case ITEM_CHANGES_SAVED:
      return new ListItem({...action.payload});

    case ITEM_EDITING_MODE_CHANGED:
      return state
        .with({isEdited: !state.isEdited});

    default:
      return state;
  }
};
