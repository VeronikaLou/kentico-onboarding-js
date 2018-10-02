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
import { Dispatch } from 'redux';

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

const receiveItems = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_RECEIVED,
  payload: {
    items,
  },
});

const requestItems = (): IListAction => ({
  type: ITEMS_REQUESTED,
  payload: {},
});

export const fetchItems = (): any =>
  (dispatch: Dispatch<IListAction>) => {
    dispatch(requestItems());

    fetch('/v1/List')
      .then(response => response.json())
      .then((json: Array<IFetchedItem>) => json
        .map((item: IFetchedItem) => [item.id, new ListItem(item)]))
      .then(items => dispatch(receiveItems(OrderedMap<Uuid, ListItem>(items))))
      .catch(error => alert(error));
  };

export const fetchAddItem = (text: string): any =>
  (dispatch: Dispatch<IListAction>) => {
    fetch('v1/List/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then(response => response.json())
      .then((fetchedItem: IFetchedItem) => dispatch(addItem(fetchedItem)))
      .catch(error => alert(error));
  };

export const fetchSaveItem = (id: Uuid, text: string): any =>
  (dispatch: Dispatch<IListAction>) => {
    fetch('v1/List/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, text}),
    })
      .then(response => response.json())
      .then(item => dispatch(saveItemChanges(id, item.text)))
      .catch(error => alert(error));
  };

export const fetchDeleteItem = (id: Uuid): any =>
  (dispatch: Dispatch<IListAction>) => {
    fetch('v1/List/' + id, {
      method: 'DELETE',
      body: JSON.stringify({id}),
    })
      .then(() => dispatch(deleteItem(id)))
      .catch(error => alert(error));
  };
