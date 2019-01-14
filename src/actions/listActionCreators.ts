import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAIL,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_EDITING_MODE_CHANGE, ITEM_SAVE_FAIL, ITEM_SAVE_REQUEST, ITEM_SAVE_SUCCESS,
  ITEMS_FETCH_FAIL,
  ITEMS_FETCH_SUCCESS,
  ITEMS_REQUEST,
} from './types/listActionTypes';
import { IListAction } from './types/IListAction';
import { ListError } from '../models/ListError';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { addItem as addItemFactory } from './factories/addItem';

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGE,
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
  type: ITEM_DELETE_REQUEST,
  payload: {id},
});

export const deleteItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_DELETE_FAIL,
  payload: {
    id,
    error,
  },
});

export const deleteItemSuccess = (id: Uuid): IListAction => ({
  type: ITEM_DELETE_SUCCESS,
  payload: {id},
});

export const itemsFetchSuccess = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_FETCH_SUCCESS,
  payload: {
    items,
  },
});

export const requestItems = (): IListAction => ({
  type: ITEMS_REQUEST,
  payload: null,
});

export const itemsFetchFail = (): IListAction => ({
  type: ITEMS_FETCH_FAIL,
  payload: null,
});

export const addItem = (id: Uuid, text: string): IListAction =>
  addItemFactory(() => id)(text);

export const addItemSuccess = (id: Uuid, fetchedId: Uuid): IListAction => ({
  type: ITEM_ADD_SUCCESS,
  payload: {
    id,
    fetchedId,
  },
});

export const addItemFail = (id: Uuid, error: ListError): IListAction => ({
  type: ITEM_ADD_FAIL,
  payload: {
    id,
    error,
  },
});

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
