import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import {
  ITEM_ADD_FAILED,
  ITEM_ADD_SUCCEEDED,
  ITEM_DELETE_FAILED,
  ITEM_SAVE_FAILED,
} from '../types/listActionTypes';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { ListError } from '../../models/ListError';
import Mock = jest.Mock;
import { retryFactory } from './retryFactory';

describe('Retry', () => {
  const itemId = '00000000-0000-0000-0000-000000000001';
  const errorIds = {errorId: '00000000-0000-0000-0000-000000000002', itemId};
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const getState = jest.fn(() => ({
    items: OrderedMap<Uuid, ListItem>()
      .set(
        itemId,
        new ListItem({id: itemId})),
  }));
  const postItem = jest.fn();
  const deleteItem = jest.fn();
  const putItem = jest.fn();
  const retry = retryFactory({deleteItem, putItem, postItem});

  const checkCalledFunctions = (callsPost: boolean, callsDelete: boolean, callsPut: boolean): void => {
    const calledPost = callsPost ? 1 : 0;
    const calledDelete = callsDelete ? 1 : 0;
    const calledPut = callsPut ? 1 : 0;
    expect(dispatch.mock.calls.length).toBe(calledPost + calledDelete + calledPut);
    expect(postItem.mock.calls.length).toBe(calledPost);
    expect(deleteItem.mock.calls.length).toBe(calledDelete);
    expect(putItem.mock.calls.length).toBe(calledPut);
  };

  beforeEach(() => {
    dispatch.mockClear();
    postItem.mockClear();
    deleteItem.mockClear();
    putItem.mockClear();
  });

  it('calls post add item when passing error with failed add', () => {
    const addFailError = new ListError({
      ...errorIds,
      action: ITEM_ADD_FAILED,
    });

    retry(addFailError)(dispatch, getState);

    checkCalledFunctions(true, false, false);
  });

  it('calls delete item when passing error with failed delete', () => {
    const deleteFailError = new ListError({
      ...errorIds,
      action: ITEM_DELETE_FAILED,
    });

    retry(deleteFailError)(dispatch, getState);

    checkCalledFunctions(false, true, false);
  });

  it('calls put item when passing error with failed save', () => {
    const addFailError = new ListError({
      ...errorIds,
      action: ITEM_SAVE_FAILED,
    });

    retry(addFailError)(dispatch, getState);

    checkCalledFunctions(false, false, true);
  });

  it('throws error when passing error with other actions', () => {
    const addSuccessError = new ListError({
      ...errorIds,
      action: ITEM_ADD_SUCCEEDED,
    });

    expect(() => retry(addSuccessError)(dispatch, getState))
      .toThrow('Invalid action was dispatched.');
  });
});
