import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { IListAction } from '../types/IListAction';
import {
  ITEMS_RECEIVE_FAIL,
  ITEMS_RECEIVE_SUCCESS,
  ITEMS_REQUESTED
} from '../types/listActionTypes';
import { IFetchedItem } from '../../models/IFetchedItem';
import { validateGetResponse } from '../../utils/responseValidator';
import { Dispatch } from '../types/Dispatcher';

const receiveItemsSuccess = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_RECEIVE_SUCCESS,
  payload: {
    items,
  },
});

const requestItems = (): IListAction => ({
  type: ITEMS_REQUESTED,
  payload: null,
});

const receiveItemsFail = (): IListAction => ({
  type: ITEMS_RECEIVE_FAIL,
  payload: null,
});

export const getItemsFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>

    (): ((dispatch: Dispatch<IListAction>) => Promise<IListAction>) =>

      (dispatch: Dispatch<IListAction>): Promise<IListAction | any> => {
        dispatch(requestItems());

        return fetch('/v1/List')
          .then(response => validateGetResponse(response))
          .then((items: Array<IFetchedItem>) => items
            .map((item: IFetchedItem) => [item.id, new ListItem(item)]))
          .then(items => dispatch(receiveItemsSuccess(OrderedMap<Uuid, ListItem>(items))))
          .catch(() => dispatch(receiveItemsFail()));
      };
