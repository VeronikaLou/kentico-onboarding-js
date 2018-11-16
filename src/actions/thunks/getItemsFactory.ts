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

export const receiveItemsSuccess = (items: OrderedMap<Uuid, ListItem>): IListAction => ({
  type: ITEMS_RECEIVE_SUCCESS,
  payload: {
    items,
  },
});

export const requestItems = (): IListAction => ({
  type: ITEMS_REQUESTED,
  payload: null,
});

export const receiveItemsFail = (): IListAction => ({
  type: ITEMS_RECEIVE_FAIL,
  payload: null,
});

export const getItemsFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    () =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(requestItems());

        try {
          const response: Response = await fetch('/v1/List');
          const fetchedItems: Array<IFetchedItem> = await validateGetResponse(response);
          const items: OrderedMap<Uuid, ListItem> = OrderedMap<Uuid, ListItem>(
            fetchedItems.map((item: IFetchedItem) => [item.id, new ListItem(item)])
          );

          return dispatch(receiveItemsSuccess(items));
        } catch (exception) {
          return dispatch(receiveItemsFail());
        }
      };
