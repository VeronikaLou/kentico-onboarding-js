import { ItemsState } from '../store/types/ItemsState';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { getItemsFactory } from './thunks/getItemsFactory';
import { IFetchedItem } from '../models/IFetchedItem';
import { validateGetResponse } from '../utils/responseValidator';

const listRoute = '/v1/List/';

const obtainItems =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (): Promise<ItemsState> => {
      const response: Response = await fetch(listRoute);
      const fetchedItems: ReadonlyArray<IFetchedItem> = await validateGetResponse(response);

      return OrderedMap<Uuid, ListItem>(
        fetchedItems.map((item: IFetchedItem) => [item.id, new ListItem(item)]),
      );
    };

export const getItems = getItemsFactory({obtainItems: obtainItems(fetch)});
