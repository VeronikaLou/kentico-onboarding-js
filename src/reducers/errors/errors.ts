import { ErrorsState } from '../../store/types/ErrorsState';
import { ListError } from '../../models/ListError';
import { IListAction } from '../../actions/types/IListAction';
import {
  CLOSE_ADD_ERROR,
  ITEM_ADD_FAILED,
  ITEM_ADD_STARTED,
} from '../../actions/types/listActionTypes';
import { OrderedMap } from 'immutable';

export const errors = (
  state: ErrorsState = OrderedMap<Uuid, ListError>(),
  action: IListAction,
): ErrorsState => {
  switch (action.type) {
    case ITEM_ADD_FAILED:
      return state.set(action.payload.error.errorId, action.payload.error);

    case ITEM_ADD_STARTED:
    case CLOSE_ADD_ERROR: {
      const foundError = state.valueSeq()
        .find((error: ListError) => error.itemId === action.payload.id);
      if (foundError)
        return state.delete(foundError.errorId);
      return state;
    }

    default:
      return state;
  }
};
