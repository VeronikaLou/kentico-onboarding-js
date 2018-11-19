import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { ListError } from '../../models/ListError';
import { ITEM_SAVE_FAIL, ITEM_SAVE_REQUEST, ITEM_SAVE_SUCCESS } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { validatePutResponse } from '../../utils/responseValidator';

export const saveItem = (id: Uuid, text: string, backupText: string = ''): IListAction => ({
  type: ITEM_SAVE_REQUEST,
  payload: {
    id,
    text,
    isUpdating: true,
    backupText,
  },
});

export const saveItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_SAVE_FAIL,
  payload: {
    id,
    error,
  },
});

export const saveItemSuccess = (id: Uuid): IListAction => ({
  type: ITEM_SAVE_SUCCESS,
  payload: {id},
});

export const putItemFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (id: Uuid, text: string, backupText: string = '') =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(saveItem(id, text, backupText));

        try {
          const response: Response = await fetch(
            'v1/List/' + id,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id, text}),
            });

          const fetchedItem: IFetchedItem = await validatePutResponse(response);

          return dispatch(saveItemSuccess(fetchedItem.id));
        } catch (exception) {
          return dispatch(saveItemFail(
            id,
            createError(ITEM_SAVE_FAIL, 'Item Save failed.', id)),
          );
        }
      };
