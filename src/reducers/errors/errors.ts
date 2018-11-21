import { ErrorsState } from '../../store/types/ErrorsState';
import { ListError } from '../../models/ListError';
import { IListAction } from '../../actions/types/IListAction';
import {
  ITEM_ADD_FAIL,
  ITEM_ADD_REQUEST,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  CLOSE_SAVE_ERROR,
  ITEM_SAVE_FAIL,
  ITEM_SAVE_REQUEST,
  CLOSE_ADD_ERROR, CLOSE_DELETE_ERROR,
} from '../../actions/types/listActionTypes';
import { OrderedMap } from 'immutable';

export const errors = (
  state: ErrorsState = OrderedMap<Uuid, ListError>(),
  action: IListAction,
): ErrorsState => {
  switch (action.type) {
    case ITEM_DELETE_FAIL:
    case ITEM_SAVE_FAIL:
    case ITEM_ADD_FAIL:
      return state.set(action.payload.error.errorId, action.payload.error);

    case ITEM_ADD_REQUEST:
    case ITEM_SAVE_REQUEST:
    case ITEM_DELETE_REQUEST:
    case CLOSE_ADD_ERROR:
    case CLOSE_DELETE_ERROR:
    case CLOSE_SAVE_ERROR: {
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
