import { ListItem } from '../../models/ListItem';
import {
  ITEM_ADD_STARTED, ITEM_ADD_SUCCEEDED,
  ITEM_CHANGES_SAVED, ITEM_DELETE_STARTED,
  ITEM_EDITING_MODE_CHANGED,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';

export const item = (state: ListItem = new ListItem(), action: IListAction): ListItem => {
  switch (action.type) {
    case ITEM_DELETE_STARTED:
      return state
        .with({isUpdating: true, isEdited: false});

    case ITEM_ADD_SUCCEEDED:
      return state
        .with({id: action.payload.fetchedId, isUpdating: false});

    case ITEM_ADD_STARTED:
    case ITEM_CHANGES_SAVED:
      return new ListItem({...action.payload});

    case ITEM_EDITING_MODE_CHANGED:
      return state
        .with({isEdited: !state.isEdited});

    default:
      return state;
  }
};
