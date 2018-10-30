import { ListError } from '../models/ListError';
import {
  ITEM_ADD_FAIL,
  ITEM_DELETE_FAIL,
  ITEM_SAVE_CLOSE,
  ITEM_SAVE_FAIL
} from './types/listActionTypes';
import { Dispatch } from './types/Dispatcher';
import { IListAction } from './types/IListAction';
import { deleteItemSuccess, saveItemSuccess } from './listActionCreators';

export const closeError = (error: ListError):
  ((dispatch: Dispatch<IListAction>) => IListAction | undefined) => {
  return (dispatch: Dispatch<IListAction>) => {
    switch (error.action) {
      case ITEM_DELETE_FAIL:
        return dispatch(saveItemSuccess(error.itemId));

      case ITEM_ADD_FAIL:
        return dispatch(deleteItemSuccess(error.itemId));

      case ITEM_SAVE_FAIL:
        return dispatch(closeSaveItem(error.itemId, error.backupText));

      default:
        return;
    }
  };
};

const closeSaveItem = (id: Uuid, text: string): IListAction => ({
  type: ITEM_SAVE_CLOSE,
  payload: {
    id,
    text,
  },
});
