import { IListAction } from '../types/IListAction';
import { deleteItemSuccess } from '../listActionCreators';
import { ITEM_DELETE_FAIL, ITEM_DELETE_REQUESTED } from '../types/listActionTypes';
import { ListError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';

export const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_REQUESTED,
  payload: {id},
});

export const deleteItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_DELETE_FAIL,
  payload: {
    id,
    error,
  },
});

export const deleteItemFactory =
  ((fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (id: Uuid) => {
      const error = createError(ITEM_DELETE_FAIL, 'Item Delete failed.', id);

      return (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(deleteItem(id));

        return fetch('v1/List/' + id, {
          method: 'DELETE',
          body: JSON.stringify({id}),
        })
          .then((response: Response) =>
            response.status === 204 && response.ok
              ? dispatch(deleteItemSuccess(id))
              : dispatch(deleteItemFail(id, error))
          )
          .catch(() => dispatch(deleteItemFail(id, error)));
      };
    });
