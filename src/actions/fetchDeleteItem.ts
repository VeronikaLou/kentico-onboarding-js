import { IListAction } from './types/IListAction';
import { deleteItemSuccess } from './listActionCreators';
import { generateId } from '../utils/generateId';
import { ITEM_DELETE_FAIL, ITEM_DELETE_REQUESTED } from './types/listActionTypes';
import { ListError } from '../models/ListError';
import { Dispatch } from './types/Dispatcher';

export const fetchDeleteItem = (id: Uuid):
  ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) => {
  const error = new ListError({
    errorId: generateId(),
    itemId: id,
    message: 'Item Delete failed.',
    action: ITEM_DELETE_FAIL,
  });

  return (dispatch: Dispatch<IListAction>) => {
    dispatch(deleteItem(id));

    return fetch('v1/List/' + id, {
      method: 'DELETE',
      body: JSON.stringify({id}),
    })
      .then(() => dispatch(deleteItemSuccess(id)))
      .catch(() => dispatch(deleteItemFail(id, error)));
  };
};

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
