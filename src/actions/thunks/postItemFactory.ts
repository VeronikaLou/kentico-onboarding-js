import { Dispatch } from 'redux';
import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAIL, ITEM_ADD_SUCCESS } from '../types/listActionTypes';
import { ListItem } from '../../models/ListItem';
import { addItem as addItemFactory } from '../factories/addItem';
import { createError } from '../../utils/errorsCreator';
import { validatePutPostResponse } from '../../utils/responseValidator';

export const postItemFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (text: string, itemId: Uuid):
      ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
      const item = new ListItem({id: itemId, text});
      const error = createError(ITEM_ADD_FAIL, 'Item Add failed.', itemId);

      return (dispatch: Dispatch<IListAction>) => {
        dispatch(addItem(item.id, item.text));

        return fetch('v1/List/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({text}),
        })
          .then((response: Response) => validatePutPostResponse(response, 201))
          .then((fetchedItem: IFetchedItem) => dispatch(addItemSuccess(itemId, fetchedItem.id)))
          .catch(() => dispatch(addItemFail(itemId, error)));
      };
    };

const addItem = (id: Uuid, text: string): IListAction =>
  addItemFactory(() => id)(text);

const addItemSuccess = (id: Uuid, fetchedId: Uuid): IListAction => ({
  type: ITEM_ADD_SUCCESS,
  payload: {
    id,
    fetchedId,
  },
});

const addItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_ADD_FAIL,
  payload: {
    id,
    error,
  },
});
