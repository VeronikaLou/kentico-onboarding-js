import { generateId, Uuid } from '../utils/generateId';
import {
  ITEM_CHANGES_SAVED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_DELETED,
} from './types/listActionTypes';
import { addItem as addItemFactory } from './factories/addItem';
import { IListAction } from './IListAction';

export const addItem = (text: string): IListAction => addItemFactory(generateId)(text);

export const deleteItem = (id: Uuid): IListAction => ({
  type: ITEM_DELETED,
  payload: {
    id,
  },
});

export const saveItemChanges = (id: Uuid, text: string): IListAction => ({
  type: ITEM_CHANGES_SAVED,
  payload: {
    id,
    text,
  },
});

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGED,
  payload: {
    id,
  },
});
