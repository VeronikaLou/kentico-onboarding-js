import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_FETCH_FAIL, ITEMS_REQUEST } from '../../actions/types/listActionTypes';

export const fetchingItemsFail = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_FETCH_FAIL:
      return true;

    case ITEMS_REQUEST:
      return false;

    default:
      return state;
  }
};
