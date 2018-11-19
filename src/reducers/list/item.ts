import { ListItem } from '../../models/ListItem';
import {
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_EDITING_MODE_CHANGE,
  ITEM_SAVE_FAIL,
  ITEM_SAVE_REQUEST,
  ITEM_SAVE_SUCCESS,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';

export const item = (state: ListItem = new ListItem(), action: IListAction): ListItem => {
  switch (action.type) {
    case ITEM_ADD_SUCCESS:
      return state
        .with({id: action.payload.fetchedId, isUpdating: false});

    case ITEM_DELETE_REQUEST:
      return state
        .with({isUpdating: true, isEdited: false});

    case ITEM_SAVE_SUCCESS:
    case CLOSE_DELETE_ERROR:
      return state
        .with({isUpdating: false});

    case ITEM_EDITING_MODE_CHANGE:
      return state
        .with({isEdited: !state.isEdited});

    case ITEM_ADD_FAIL:
    case ITEM_SAVE_FAIL:
    case ITEM_DELETE_FAIL:
      return state
        .with({isEdited: false, isUpdating: false});

    case ITEM_ADD_REQUEST:
    case ITEM_SAVE_REQUEST:
    case CLOSE_SAVE_ERROR:
      return new ListItem({...action.payload});

    default:
      return state;
  }
};
