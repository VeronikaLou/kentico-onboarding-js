import { generateId } from '../utils/generateId';
import {
  CHANGES_SAVED,
  EDITING_MODE_CHANGED,
  ITEM_ADDED,
  ITEM_DELETED
} from './actionTypes';

const _addItem = (generator) => (text) => ({
  type: ITEM_ADDED,
  payload: {
    id: generator(),
    text
  }
});

// export const addItem = (text) => _addItem(text, generateId);
export const addItem = (text) => _addItem(generateId)(text);
export const deleteItem = id => ({
  type: ITEM_DELETED,
  payload: {
    id
  }
});

export const saveChanges = (id, text) => ({
  type: CHANGES_SAVED,
  payload: {
    id,
    text
  }
});

export const changeEditingMode = id => ({
  type: EDITING_MODE_CHANGED,
  payload: {
    id
  }
});
