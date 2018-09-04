import { ITEM_ADDED } from '../types/listActionTypes';
import { IListAction } from '../IListAction';

export const addItem = (generator: Function) => (text: string): IListAction => ({
  type: ITEM_ADDED,
  payload: {
    id: generator(),
    text,
  },
});
