import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { IListAction } from './types/IListAction';
import { ITEMS_RECEIVE_SUCCESS, ITEMS_REQUESTED } from './types/listActionTypes';
import { Dispatch } from 'redux';
import { IFetchedItem } from '../models/IFetchedItem';

const receiveItems = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_RECEIVE_SUCCESS,
  payload: {
    items,
  },
});

const requestItems = (): IListAction => ({
  type: ITEMS_REQUESTED,
  payload: null,
});

export const getItems = (): any =>
  (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
    dispatch(requestItems());

    return fetch('/v1/List')
      .then(response => response.json())
      .then((json: Array<IFetchedItem>) => json
        .map((item: IFetchedItem) => [item.id, new ListItem(item)]))
      .then(items => dispatch(receiveItems(OrderedMap<Uuid, ListItem>(items))));
      // .catch(error => alert(error));
  };
