import { generateId } from '../utils/generateId';
import { retryFactory } from './thunks/retryFactory';
import { getItemsFactory } from './thunks/getItemsFactory';
import { postItemFactory } from './thunks/postItemFactory';
import { putItemFactory } from './thunks/putItemFactory';
import { deleteItemFactory } from './thunks/deleteItemFactory';
import { IFetchedItem } from '../models/IFetchedItem';
import {
  validateDeleteResponse,
  validateGetResponse,
  validatePostResponse,
  validatePutResponse,
} from '../utils/responseValidator';
import { ItemsState } from '../store/types/ItemsState';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

const performPut =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (id: Uuid, text: string): Promise<IFetchedItem> => {
      const response: Response = await fetch(
        'v1/List/' + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, text}),
        });

      return await validatePutResponse(response);
    };

const performGet =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (): Promise<ItemsState> => {
      const response: Response = await fetch('/v1/List');
      const fetchedItems: Array<IFetchedItem> = await validateGetResponse(response);

      return OrderedMap<Uuid, ListItem>(
        fetchedItems.map((item: IFetchedItem) => [item.id, new ListItem(item)]),
      );
    };

const performDelete =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (id: Uuid): Promise<void> => {
      const response: Response = await fetch(
        'v1/List/' + id,
        {
          method: 'DELETE',
          body: JSON.stringify({id}),
        });
      validateDeleteResponse(response);
    };

const performPost =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    async (text: string): Promise<IFetchedItem> => {
      const response: Response = await fetch(
        'v1/List/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({text}),
        });

      return await validatePostResponse(response);
    };

export const putItem = putItemFactory({getFetchedItem: performPut(fetch)});
export const deleteItem = deleteItemFactory({performDelete: performDelete(fetch)});
export const postItem = (text: string, id: Uuid = generateId()) => postItemFactory({getFetchedItem: performPost(fetch)})(id, text);
export const getItems = getItemsFactory({getItems: performGet(fetch)});
export const retry = retryFactory({deleteItem, postItem, putItem});
