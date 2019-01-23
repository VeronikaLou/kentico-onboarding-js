import { generateId } from '../utils/generateId';
import { retryFactory } from './thunks/retryFactory';
import { getItemsFactory } from './thunks/getItemsFactory';
import { postItemFactory } from './thunks/postItemFactory';
import { putItemFactory } from './thunks/putItemFactory';
import { deleteItemFactory } from './thunks/deleteItemFactory';
import { IFetchedItem } from '../models/IFetchedItem';
import { validatePutResponse } from '../utils/responseValidator';

export const getFetchedItem =
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

export const putItem = putItemFactory(getFetchedItem(fetch));
export const deleteItem = deleteItemFactory(fetch);
export const postItem = (text: string, id: Uuid = generateId()) => postItemFactory(fetch)(text, id);
export const getItems = getItemsFactory(fetch);
export const retry = retryFactory({deleteItem, postItem, putItem});
