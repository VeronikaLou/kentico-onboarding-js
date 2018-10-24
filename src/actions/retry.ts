import { ListError } from '../models/ListError';
import { ITEM_ADD_FAIL, ITEM_DELETE_FAIL, ITEM_SAVE_FAIL } from './types/listActionTypes';
import { Dispatch } from './types/Dispatcher';
import { IListAction } from './types/IListAction';
import { fetchDeleteItem } from './fetchDeleteItem';
import { IStore } from '../store/types/IStore';
import { fetchAddItem } from './fetchAddItem';
import { fetchSaveItem } from './fetchSaveItem';

export const retry = (error: ListError): any => {
  return (dispatch: Dispatch<IListAction>, getState: () => IStore) => {
    const item = getState().items.get(error.itemId);
    switch (error.action) {
      case ITEM_DELETE_FAIL:
        return dispatch(fetchDeleteItem(item.id));

      case ITEM_ADD_FAIL:
        return dispatch(fetchAddItem(item.text, item.id));

      case ITEM_SAVE_FAIL:
        return dispatch(fetchSaveItem(item.id, item.text));

      default:
        return;
    }
  };
};

