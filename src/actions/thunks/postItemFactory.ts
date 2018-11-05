import { Dispatch } from 'redux';
import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { generateId } from '../../utils/generateId';
import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAIL, ITEM_ADD_SUCCESS } from '../types/listActionTypes';
import { ListItem } from '../../models/ListItem';
import { addItem as addItemFactory } from '../factories/addItem';

export const postItemFactory = (fetch: any) => (text: string, itemId: Uuid = generateId()):
  ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
  const item = new ListItem({id: itemId, text});
  const error = new ListError({
    errorId: generateId(),
    itemId: itemId,
    message: 'Item Add failed.',
    action: ITEM_ADD_FAIL,
  });

  return (dispatch: Dispatch<IListAction>) => {
    dispatch(addItem(item.id, item.text));

    return fetch('v1/List/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then((response: any) => response.json())
      .then((fetchedItem: IFetchedItem) =>
        dispatch(addItemSuccess(itemId, fetchedItem.id)))
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
