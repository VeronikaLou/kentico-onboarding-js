import {
  ITEM_EDITING_MODE_CHANGED,
} from './types/listActionTypes';
import { IListAction } from './types/IListAction';

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGED,
  payload: {id},
});
