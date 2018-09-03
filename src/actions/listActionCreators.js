import { generateId } from '../utils/generateId.ts';
import {
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_DELETED
} from './types/listActionTypes';
import { addItem as addItemFactory } from './factories/addItem';

export const addItem = (text) => addItemFactory(generateId)(text);

export const deleteItem = id => ({
  type: ITEM_DELETED,
  payload: {
    id
  }
});

export const saveItemChanges = (id, text) => ({
  type: ITEM_CHANGES_SAVED,
  payload: {
    id,
    text
  }
});

export const changeItemEditingMode = id => ({
  type: ITEM_EDITING_MODE_CHANGED,
  payload: {
    id
  }
});
