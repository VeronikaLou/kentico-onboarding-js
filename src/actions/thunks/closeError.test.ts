import { Dispatch } from '../types/Dispatcher';
import { closeError } from './closeError';
import { ListError } from '../../models/ListError';
import { ErrorType } from '../../models/ErrorType';
import { IStore } from '../../store/types/IStore';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { CLOSE_ADD_ERROR, CLOSE_DELETE_ERROR } from '../types/listActionTypes';
import Mock = jest.Mock;

describe('Close error', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const state: IStore = {
    items: OrderedMap<Uuid, ListItem>(),
    isFetching: false,
    fetchingItemsFail: false,
    errors: OrderedMap<Uuid, ListError>(),
  };
  const getState = jest.fn(() => state);
  const errorIds = {
    itemId: '00000000-0000-0000-0000-000000000001',
    errorId: '00000000-0000-0000-0000-000000000002',
  };

  const failedActionsWithCorrespondingErrors = [
    {action: ErrorType.ADD, error: CLOSE_ADD_ERROR},
    {action: ErrorType.DELETE, error: CLOSE_DELETE_ERROR},
  ];

  beforeEach(() => {
    dispatch.mockClear();
  });

  failedActionsWithCorrespondingErrors.forEach(({action, error}) => {
    it(`dispatches ${error} when passing error with ${action}`, () => {
      const addFailError = new ListError({...errorIds, action});

      closeError(addFailError)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls[0][0].type).toEqual(error);
    });
  });

  it('throws error when passing error with other actions', () => {
    const defaultErrorType = new ListError({...errorIds, action: ErrorType.DEFAULT});

    expect(() => closeError(defaultErrorType)(dispatch, getState))
      .toThrow('Invalid action was dispatched.');
    expect(dispatch.mock.calls.length).toBe(0);
  });
});
