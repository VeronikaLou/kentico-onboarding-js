import {
  ITEM_CHANGES_SAVED,
  ITEM_DELETED,
  ITEM_EDITING_MODE_CHANGED,
  ITEMS_RECEIVED,
  ITEMS_REQUESTED,
} from './types/listActionTypes';
import { addItem as addItemFactory } from './factories/addItem';
import { IListAction } from './types/IListAction';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import { IFetchedItem } from '../models/IFetchedItem';

export const addItem = (item: IFetchedItem): IListAction =>
  addItemFactory(() => item.id)(item.text);

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

export const receiveItems = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_RECEIVED,
  payload: {
    items,
  },
});

export const requestItems = (): IListAction => ({
  type: ITEMS_REQUESTED,
  payload: {},
});
