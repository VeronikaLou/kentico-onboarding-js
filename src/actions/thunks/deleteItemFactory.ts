import { IListAction } from '../types/IListAction';
import {
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
} from '../types/listActionTypes';
import { ListError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { validateDeleteResponse } from '../../utils/responseValidator';

export const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_REQUEST,
  payload: {id},
});

export const deleteItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_DELETE_FAIL,
  payload: {
    id,
    error,
  },
});

export const deleteItemSuccess = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_SUCCESS,
  payload: {id},
});

export const deleteItemFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (id: Uuid) =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(deleteItem(id));

        try {
          const response: Response = await fetch(
            'v1/List/' + id,
            {
              method: 'DELETE',
              body: JSON.stringify({id}),
            });
          validateDeleteResponse(response);

          return dispatch(deleteItemSuccess(id));
        } catch (exception) {
          return dispatch(deleteItemFail(
            id,
            createError(ITEM_DELETE_FAIL, 'Item Delete failed.', id)),
          );
        }
      };
