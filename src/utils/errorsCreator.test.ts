import { ITEM_DELETE_FAILED } from '../actions/types/listActionTypes';
import { createErrorFactory } from './errorsCreator';

describe('Create error', () => {
  it('should create error with given action, message, id and item id', () => {
    const action = ITEM_DELETE_FAILED;
    const message = 'Item Delete failed.';
    const itemId = '00000000-0000-0000-0000-000000000001';
    const errorId = '00000000-0000-0000-0000-000000000002';

    const error = createErrorFactory(() => errorId)(action, message, itemId);

    expect(error.errorId).toEqual(errorId);
    expect(error.itemId).toEqual(itemId);
    expect(error.action).toEqual(action);
    expect(error.message).toEqual(message);
  });
});
