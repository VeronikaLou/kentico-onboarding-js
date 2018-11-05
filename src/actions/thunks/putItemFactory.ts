import { IListAction } from '../types/IListAction';
import { saveItemSuccess } from '../listActionCreators';
import { IFetchedItem } from '../../models/IFetchedItem';
import { ListError } from '../../models/ListError';
import { ITEM_SAVE_FAIL, ITEM_SAVE_REQUESTED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { validatePutPostResponse } from '../../utils/responseValidator';

export const putItemFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (id: Uuid, text: string, backupText: string = ''):
      ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
      const error = createError(ITEM_SAVE_FAIL, 'Item Save failed.', id);

      return (dispatch: Dispatch<IListAction>) => {
        dispatch(saveItem(id, text, backupText));

        return fetch('v1/List/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, text}),
        })
          .then((response: Response) => validatePutPostResponse(response, 200))
          .then((item: IFetchedItem) => dispatch(saveItemSuccess(item.id)))
          .catch(() => dispatch(saveItemFail(id, error)));
      };
    };

const saveItem = (id: Uuid, text: string, backupText: string): IListAction => ({
  type: ITEM_SAVE_REQUESTED,
  payload: {
    id,
    text,
    isUpdating: true,
    backupText
  },
});

const saveItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_SAVE_FAIL,
  payload: {
    id,
    error,
  },
});
