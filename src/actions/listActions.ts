import { ItemsState } from '../store/types/ItemsState';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { getItemsFactory } from './thunks/getItemsFactory';
import { IFetchedItem } from '../models/IFetchedItem';
import { validateGetResponse, validatePostResponse } from '../utils/responseValidator';
import { postItemFactory } from './thunks/postItemFactory';

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

const createItem =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (text: string): Promise<IFetchedItem> => {
      const response: Response = await fetch(
        listRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({text}),
        });

      return await validatePostResponse(response);
    };

export const getItems = getItemsFactory({obtainItems: obtainItems(fetch)});
export const postItem = (text: string) =>
  postItemFactory({createItem: createItem(fetch)})(text);
