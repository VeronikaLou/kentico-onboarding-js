import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAIL,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_SAVE_FAIL,
} from '../types/listActionTypes';
import { closeError } from './closeError';
import { ListError } from '../../models/ListError';
import Mock = jest.Mock;

describe('Close error', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const errorIds = {
    itemId: '00000000-0000-0000-0000-000000000001',
    errorId: '00000000-0000-0000-0000-000000000002',
  };

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches CLOSE_DELETE_ERROR when passing error with failed delete', () => {
    const deleteFailError = new ListError({...errorIds, action: ITEM_DELETE_FAIL});

    closeError(deleteFailError, '')(dispatch);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(CLOSE_DELETE_ERROR);
  });

  it('dispatches CLOSE_ADD_ERROR when passing error with failed add', () => {
    const addFailError = new ListError({...errorIds, action: ITEM_ADD_FAIL});

    closeError(addFailError, '')(dispatch);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(CLOSE_ADD_ERROR);
  });

  it('dispatches CLOSE_SAVE_ERROR when passing error with failed save', () => {
    const saveFailError = new ListError({...errorIds, action: ITEM_SAVE_FAIL});

    closeError(saveFailError, '')(dispatch);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].type).toBe(CLOSE_SAVE_ERROR);
  });

  it('throws error when passing error with other actions', () => {
    const addSuccessError = new ListError({...errorIds, action: ITEM_ADD_SUCCESS});

    expect(() => closeError(addSuccessError, '')(dispatch))
      .toThrow('Invalid action was dispatched.');
    expect(dispatch.mock.calls.length).toBe(0);
  });
});
