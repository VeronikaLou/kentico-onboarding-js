import { IError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { closeAddError } from '../listActionCreators';
import { ErrorType } from '../../models/ErrorType';

export const closeError = (error: IError) =>
  (dispatch: Dispatch): IListAction => {
    switch (error.action) {
      case ErrorType.ADD:
        return dispatch(closeAddError(error.itemId));

      default:
        throw new Error('Invalid action was dispatched.');
    }
  };
