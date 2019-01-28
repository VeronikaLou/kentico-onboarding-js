import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAILED,
  ITEM_ADD_SUCCEEDED,
  ITEM_DELETE_FAILED,
  ITEM_DELETE_STARTED,
  ITEM_DELETE_SUCCEEDED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_SAVE_FAILED,
  ITEM_SAVE_STARTED,
  ITEM_SAVE_SUCCEEDED,
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCEEDED,
} from './types/listActionTypes';
import { IListAction } from './types/IListAction';
import { ListError } from '../models/ListError';
import { addItem as addItemFactory } from './factories/addItem';
import { ItemsState } from '../store/types/ItemsState';

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGED,
  payload: {id},
});

export const closeSaveError = (id: Uuid, text: string): IListAction => ({
  type: CLOSE_SAVE_ERROR,
  payload: {
    id,
    text,
  },
});

export const closeDeleteError = (id: Uuid): IListAction => ({
  type: CLOSE_DELETE_ERROR,
  payload: {id},
});

export const closeAddError = (id: Uuid): IListAction => ({
  type: CLOSE_ADD_ERROR,
  payload: {id},
});

export const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_STARTED,
  payload: {id},
});

export const deleteItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_DELETE_FAILED,
  payload: {
    id,
    error,
  },
});

export const deleteItemSuccess = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_SUCCEEDED,
  payload: {id},
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

export const addItem = (id: Uuid, text: string): IListAction =>
  addItemFactory(() => id)(text);

export const addItemSuccess = (id: Uuid, fetchedId: Uuid): IListAction => ({
  type: ITEM_ADD_SUCCEEDED,
  payload: {
    id,
    fetchedId,
  },
});

export const addItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_ADD_FAILED,
  payload: {
    id,
    error,
  },
});

export const saveItem = (id: Uuid, text: string, backupText: string = ''): IListAction => ({
  type: ITEM_SAVE_STARTED,
  payload: {
    id,
    text,
    isUpdating: true,
    backupText,
  },
});

export const saveItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_SAVE_FAILED,
  payload: {
    id,
    error,
  },
});

export const saveItemSuccess = (id: Uuid): IListAction => ({
  type: ITEM_SAVE_SUCCEEDED,
  payload: {id},
});
