import { getItemsFactory } from './getItemsFactory';
import { ITEMS_RECEIVE_SUCCESS, ITEMS_REQUESTED } from '../types/listActionTypes';

describe('Get items', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
  });
  const okFetch = jest.fn(() => Promise.resolve({
    status: 200,
    statusText: 'Ok',
    ok: true,
    json: () => ({})
  }));

  it('calls request and success actions if the fetch response was successful', () => {
    return getItemsFactory(okFetch)()(dispatch).then(() => {
      console.log(dispatch.mock.calls);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual(ITEMS_REQUESTED);
      expect(dispatch.mock.calls[1][0]).toEqual(ITEMS_RECEIVE_SUCCESS);
    });

  });
});
