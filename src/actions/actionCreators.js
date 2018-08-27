import { generateId } from '../utils/generateId';
import {
  ITEM_ADD,
  EDITING_MODE_CHANGE,
  ITEM_DELETE,
  CHANGES_SAVE
} from './actionTypes';

export const addItem = (text) => {
  return {
    type: ITEM_ADD,
    id: generateId(),
    text,
  };
};

export const deleteItem = (id) => {
  return {
    type: ITEM_DELETE,
    id
  };
};

export const saveChanges = (id, text) => {
  return {
    type: CHANGES_SAVE,
    id,
    text
  };
};

export const changeEditingMode = (id) => {
  return {
    type: EDITING_MODE_CHANGE,
    id
  };
};
