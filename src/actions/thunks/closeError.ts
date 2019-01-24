import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAILED, ITEM_DELETE_FAILED, ITEM_SAVE_FAILED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { closeAddError, closeDeleteError, closeSaveError } from '../listActionCreators';

export const closeError = (error: ListError, backupText: string) =>
  (dispatch: Dispatch<IListAction>): IListAction => {
    switch (error.action) {
      case ITEM_DELETE_FAILED:
        return dispatch(closeDeleteError(error.itemId));

      case ITEM_ADD_FAILED:
        return dispatch(closeAddError(error.itemId));

      case ITEM_SAVE_FAILED:
        return dispatch(closeSaveError(error.itemId, backupText));

      default:
        throw 'Invalid action was dispatched.';
    }
  };
