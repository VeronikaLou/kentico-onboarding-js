import { IListAction } from '../types/IListAction';
import { ITEM_DELETE_FAIL } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { validateDeleteResponse } from '../../utils/responseValidator';
import { deleteItem, deleteItemFail, deleteItemSuccess } from '../listActionCreators';

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
