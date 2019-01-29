import { Dispatch } from '../types/Dispatcher';
import {
  CLOSE_ADD_ERROR,
} from '../types/listActionTypes';
import { closeError } from './closeError';
import { ListError } from '../../models/ListError';
import Mock = jest.Mock;
import { ErrorType } from '../../models/ErrorType';

describe('Close error', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const errorIds = {
    itemId: '00000000-0000-0000-0000-000000000001',
    errorId: '00000000-0000-0000-0000-000000000002',
  };

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches CLOSE_ADD_ERROR when passing error with failed add', () => {
    const addFailError = new ListError({...errorIds, action: ErrorType.ADD});

    closeError(addFailError)(dispatch);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(CLOSE_ADD_ERROR);
  });

  it('throws error when passing error with other actions', () => {
    const defaultErrorType = new ListError({...errorIds, action: ErrorType.DEFAULT});

    expect(() => closeError(defaultErrorType)(dispatch))
      .toThrow('Invalid action was dispatched.');
    expect(dispatch.mock.calls.length).toBe(0);
  });
});
