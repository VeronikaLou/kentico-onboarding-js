import { generateId } from '../utils/generateId';
import {
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_DELETED
} from './types/listActionTypes';
import { addItem as _addItem } from './factories/addItem';

export const addItem = (text) => _addItem(generateId)(text);

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
