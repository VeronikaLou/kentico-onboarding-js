import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { validateGetResponse } from '../../utils/responseValidator';
import { Dispatch } from '../types/Dispatcher';
import { ItemsState } from '../../store/types/ItemsState';
import { itemsFetchFail, itemsFetchSuccess, requestItems } from '../listActionCreators';

export const getItemsFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    () =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(requestItems());

        try {
          const response: Response = await fetch('/v1/List');
          const fetchedItems: Array<IFetchedItem> = await validateGetResponse(response);
          const items: ItemsState = OrderedMap<Uuid, ListItem>(
            fetchedItems.map((item: IFetchedItem) => [item.id, new ListItem(item)]),
          );

          return dispatch(itemsFetchSuccess(items));
        } catch (exception) {
          return dispatch(itemsFetchFail());
        }
      };
