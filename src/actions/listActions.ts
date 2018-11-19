import { generateId } from '../utils/generateId';
import { retryFactory } from './thunks/retryFactory';
import { getItemsFactory } from './thunks/getItemsFactory';
import { postItemFactory } from './thunks/postItemFactory';
import { putItemFactory } from './thunks/putItemFactory';
import { deleteItemFactory } from './thunks/deleteItemFactory';

export const putItem = putItemFactory(fetch);
export const deleteItem = deleteItemFactory(fetch);
export const postItem = (text: string, id: Uuid = generateId()) =>  postItemFactory(fetch)(text, id);
export const getItems = getItemsFactory(fetch);
export const retry = retryFactory({deleteItem, postItem, putItem});
