import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAIL, ITEM_DELETE_FAIL, ITEM_SAVE_FAIL } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { closeAddError, closeDeleteError, closeSaveError } from '../listActionCreators';

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
