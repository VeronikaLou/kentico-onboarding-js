import { ITEM_ADDED } from '../types/listActionTypes';

export const addItem = (generator) => (text) => ({
  type: ITEM_ADDED,
  payload: {
    id: generator(),
    text
  }
});
