import { generateId } from '../utils/generateId';
import {
  ADD_ITEM,
  CHANGE_EDITING_MODE,
  DELETE_ITEM,
  SAVE_CHANGES
} from './actionTypes';

export const addItem = (text) => {
  return {
    type: ADD_ITEM,
    id: generateId(),
    text,
    isEdited: false
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id
  };
};

export const saveChanges = (id, text) => {
  return {
    type: SAVE_CHANGES,
    id,
    text
  };
};

export const changeEditingMode = (id) => {
  return {
    type: CHANGE_EDITING_MODE,
    id
  };
};
