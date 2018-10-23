import { IListAction } from './types/IListAction';
import { saveItemSuccess } from './listActionCreators';
import { IFetchedItem } from '../models/IFetchedItem';
import { ListError } from '../models/ListError';
import { generateId } from '../utils/generateId';
import { ITEM_SAVE_FAIL, ITEM_SAVE_REQUESTED } from './types/listActionTypes';
import { Dispatch } from './types/Dispatcher';

export const fetchSaveItem = (id: Uuid, text: string, backupText: string = ''):
  ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
  const error = new ListError({
    errorId: generateId(),
    itemId: id,
    message: 'Item Save failed.',
    action: ITEM_SAVE_FAIL,
    backupText,
  });

  return (dispatch: Dispatch<IListAction>) => {
    dispatch(saveItem(id, text));

    return fetch('v1/List/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, text}),
    })
      .then(response => response.json())
      .then((item: IFetchedItem) => dispatch(saveItemSuccess(item.id)))
      .catch(() => dispatch(saveItemFail(id, error)));
  };
};

const saveItem = (id: Uuid, text: string): IListAction => ({
  type: ITEM_SAVE_REQUESTED,
  payload: {
    id,
    text,
    isUpdating: true,
  },
});

const saveItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_SAVE_FAIL,
  payload: {
    id,
    error,
  },
});
