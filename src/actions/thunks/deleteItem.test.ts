import { deleteItemFactory } from './deleteItemFactory';
import {
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUESTED,
  ITEM_DELETE_SUCCESS
} from '../types/listActionTypes';

describe('Delete item', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
  });
  const itemId = '00000000-0000-0000-0000-000000000001';
  const noContentFetch = jest.fn(() =>
    Promise.resolve({
      status: 204,
      statusText: 'No Content'
    }));

  const notFoundFetch = jest.fn(() =>
    Promise.resolve(({
      status: 404,
      statusText: 'Not Found',
    })));

  it('calls request and success actions if the fetch response was successful', () => {
    deleteItemFactory(noContentFetch)(itemId)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_SUCCESS);
    });
  });

  it('calls request and fail actions if the fetch response failed', () => {
    deleteItemFactory(notFoundFetch)(itemId)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_FAIL);
    });
  });

  it('should set id in payload in success action', () => {
    deleteItemFactory(noContentFetch)(itemId)(dispatch).then(() => {
      const successPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(successPayload).length).toBe(1);
      expect(successPayload.id).toEqual(itemId);
    });
  });

  it('should set id and error in payload in fail action', () => {
    deleteItemFactory(notFoundFetch)(itemId)(dispatch).then(() => {
      const failPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(failPayload).length).toBe(2);
      expect(failPayload.id).toEqual(itemId);
      expect(failPayload.error).toBeDefined();
    });
  });
});
