import { generateId } from '../utils/generateId';
import {
  CHANGES_SAVED,
  EDITING_MODE_CHANGED,
  ITEM_ADDED,
  ITEM_DELETED
} from './actionTypes';

export const addItem = text => ({
  type: ITEM_ADDED,
  id: generateId(),
  text,
});

export const deleteItem = id => ({
  type: ITEM_DELETED,
  id
});

export const saveChanges = (id, text) => ({
  type: CHANGES_SAVED,
  id,
  text
});

export const changeEditingMode = id => ({
  type: EDITING_MODE_CHANGED,
  id
});
