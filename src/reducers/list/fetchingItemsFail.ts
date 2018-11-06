import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_RECEIVE_FAIL, ITEMS_REQUESTED } from '../../actions/types/listActionTypes';

export const fetchingItemsFail = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_RECEIVE_FAIL:
      return true;

    case ITEMS_REQUESTED:
      return false;

    default:
      return state;
  }
};
