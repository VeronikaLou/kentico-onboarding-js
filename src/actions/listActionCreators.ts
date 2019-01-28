import {
  ITEM_ADD_STARTED,
  ITEM_ADD_SUCCEEDED,
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED,
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCEEDED,
} from './types/listActionTypes';
import { IListAction } from './types/IListAction';
import { ItemsState } from '../store/types/ItemsState';

export const addItem = (id: Uuid, text: string): IListAction => ({
  type: ITEM_ADD_STARTED,
  payload: {
    id,
    text,
    isUpdating: true,
  },
});

export const addItemSuccess = (id: Uuid, fetchedId: Uuid): IListAction => ({
  type: ITEM_ADD_SUCCEEDED,
  payload: {
    id,
    fetchedId,
  },
});


export const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETED,
  payload: {
    id,
  },
});

export const saveItemChanges = (id: Uuid, text: string): IListAction => ({
  type: ITEM_CHANGES_SAVED,
  payload: {
    id,
    text,
  },
});

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGED,
  payload: {
    id,
  },
});

export const itemsFetchSuccess = (items: ItemsState): IListAction => ({
  type: ITEMS_FETCH_SUCCEEDED,
  payload: {items},
});

export const requestItems = (): IListAction => ({
  type: ITEMS_FETCH_STARTED,
  payload: null,
});

export const itemsFetchFail = (): IListAction => ({
  type: ITEMS_FETCH_FAILED,
  payload: null,
});
