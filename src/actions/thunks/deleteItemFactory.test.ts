import { deleteItemFactory } from './deleteItemFactory';
import {
  ITEM_DELETE_FAIL, ITEM_DELETE_REQUESTED,
  ITEM_DELETE_SUCCESS
} from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import Mock = jest.Mock;

describe('Delete item', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';

  const fetchNoContent = jest.fn(() =>
    Promise.resolve({
      status: 204,
      statusText: 'No Content',
      ok: true
    }));

  const fetchNotFound = jest.fn(() =>
    Promise.resolve(({
      status: 404,
      statusText: 'Not Found',
    })));

  const fetchCases = [fetchNoContent, fetchNotFound];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', () => {
    return deleteItemFactory(fetchNoContent)(itemId)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_SUCCESS);
    });
  });

  it('dispatches request and fail actions if the fetch response failed', () => {
    return deleteItemFactory(fetchNotFound)(itemId)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_FAIL);
    });
  });

  fetchCases.forEach(fetch => {
    it('should set id in payload in request action', () => {
      return deleteItemFactory(fetch)(itemId)(dispatch).then(() => {
        const requestPayload = dispatch.mock.calls[0][0].payload;

        expect(Object.keys(requestPayload).length).toBe(1);
        expect(requestPayload.id).toEqual(itemId);
      });
    });
  });

  it('should set id in payload in success action', () => {
    return deleteItemFactory(fetchNoContent)(itemId)(dispatch).then(() => {
      const successPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(successPayload).length).toBe(1);
      expect(successPayload.id).toEqual(itemId);
    });
  });

  it('should set id and error in payload in fail action', () => {
    return deleteItemFactory(fetchNotFound)(itemId)(dispatch).then(() => {
      const failPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(failPayload).length).toBe(2);
      expect(failPayload.id).toEqual(itemId);
      expect(failPayload.error).toBeDefined();
    });
  });
});
