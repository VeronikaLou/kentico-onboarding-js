import { IListAction } from '../types/IListAction';
import { deleteItemSuccess } from '../listActionCreators';
import { ITEM_DELETE_FAIL, ITEM_DELETE_REQUESTED } from '../types/listActionTypes';
import { ListError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';

export const deleteItemFactory =
  ((fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (id: Uuid): ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
      const error = createError(ITEM_DELETE_FAIL, 'Item Delete failed.', id);

      return (dispatch: Dispatch<IListAction>) => {
        dispatch(deleteItem(id));

        return fetch('v1/List/' + id, {
          method: 'DELETE',
          body: JSON.stringify({id}),
        })
          .then((response: Response) =>
            response.status === 204
              ? dispatch(deleteItemSuccess(id))
              : dispatch(deleteItemFail(id, error))
          )
          .catch(() => dispatch(deleteItemFail(id, error)));
      };
    });

const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_REQUESTED,
  payload: {id},
});

const deleteItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_DELETE_FAIL,
  payload: {
    id,
    error,
  },
});
