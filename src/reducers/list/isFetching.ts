import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_FETCH_SUCCESS, ITEMS_REQUEST } from '../../actions/types/listActionTypes';

export const isFetching = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_FETCH_SUCCESS:
      return false;

    case ITEMS_REQUEST:
      return true;

    default:
      return state;
  }
};
