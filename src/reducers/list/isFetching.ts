import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_RECEIVED, ITEMS_REQUESTED } from '../../actions/types/listActionTypes';

export const isFetching = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return false;

    case ITEMS_REQUESTED:
      return true;

    default:
      return state;
  }
};
