import { ITEM_ADD_STARTED } from '../types/listActionTypes';
import { IListAction } from '../types/IListAction';

export const addItem = (generateId: () => Uuid) =>
  (text: string): IListAction => ({
    type: ITEM_ADD_STARTED,
    payload: {
      id: generateId(),
      text,
      isUpdating: true,
    },
  });
