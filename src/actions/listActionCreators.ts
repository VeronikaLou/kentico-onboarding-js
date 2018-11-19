import {
  ITEM_EDITING_MODE_CHANGE,
} from './types/listActionTypes';
import { IListAction } from './types/IListAction';

export const changeItemEditingMode = (id: Uuid): IListAction => ({
  type: ITEM_EDITING_MODE_CHANGE,
  payload: {id},
});
