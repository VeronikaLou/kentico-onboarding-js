import { ITEM_ADD_REQUESTED } from '../types/listActionTypes';
import { IListAction } from '../types/IListAction';

export const addItem = (generator: () => Uuid) =>
  (text: string): IListAction => ({
    type: ITEM_ADD_REQUESTED,
    payload: {
      id: generator(),
      text,
      isUpdating: true,
    },
  });
