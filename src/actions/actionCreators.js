import { generateId } from '../utils/generateId';
import {
  ITEM_ADDED,
  EDITING_MODE_CHANGED,
  ITEM_DELETED,
  CHANGES_SAVED
} from './actionTypes';

export const addItem = text => {
  return {
    type: ITEM_ADDED,
    id: generateId(),
    text,
  };
};

export const deleteItem = id => {
  return {
    type: ITEM_DELETED,
    id
  };
};

export const saveChanges = (id, text) => {
  return {
    type: CHANGES_SAVED,
    id,
    text
  };
};

export const changeEditingMode = id => {
  return {
    type: EDITING_MODE_CHANGED,
    id
  };
};
