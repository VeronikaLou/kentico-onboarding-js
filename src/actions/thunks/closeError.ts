import { ListError } from '../../models/ListError';
import {
  ITEM_ADD_FAIL,
  ITEM_DELETE_FAIL,
  CLOSE_SAVE_ERROR,
  ITEM_SAVE_FAIL, CLOSE_DELETE_ERROR, CLOSE_ADD_ERROR,
} from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';

export const closeSaveError = (id: Uuid, text: string): IListAction => ({
  type: CLOSE_SAVE_ERROR,
  payload: {
    id,
    text,
  },
});

export const closeDeleteError = (id: Uuid): IListAction => ({
  type: CLOSE_DELETE_ERROR,
  payload: {id},
});

export const closeAddError = (id: Uuid): IListAction => ({
  type: CLOSE_ADD_ERROR,
  payload: {id},
});

export const closeError = (error: ListError, backupText: string) =>
  (dispatch: Dispatch<IListAction>): IListAction => {
    switch (error.action) {
      case ITEM_DELETE_FAIL:
        return dispatch(closeDeleteError(error.itemId));

      case ITEM_ADD_FAIL:
        return dispatch(closeAddError(error.itemId));

      case ITEM_SAVE_FAIL:
        return dispatch(closeSaveError(error.itemId, backupText));

      default:
        throw 'Invalid action was dispatched.';
    }
  };
