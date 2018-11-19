import { ITEM_ADD_FAIL, ITEM_ADD_REQUESTED, ITEM_ADD_SUCCESS } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { postItemFactory } from './postItemFactory';
import Mock = jest.Mock;

describe('Post item', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const generateId = jest.fn(() => itemId);
  const fetchedId = '00000000-0000-0000-0000-000000000002';
  const fetchCreated = jest.fn(() => Promise.resolve({
    status: 201,
    statusText: 'Created',
    ok: true,
    json: () => ({id: fetchedId})
  }));

  const fetchBadRequest = jest.fn(() => Promise.resolve({
    status: 400,
    statusText: 'Bad Request'
  }));

  const fetchCases = [fetchCreated, fetchBadRequest];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('calls request and success actions if the fetch response was successful', () => {
    return postItemFactory(fetchCreated)('text', generateId())(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_SUCCESS);
    });
  });

  fetchCases.forEach(fetch => {
    it('should set id, text and isUpdating in payload in request action', () => {
      const text = 'text';

      return postItemFactory(fetch)(text, generateId())(dispatch).then(() => {
        const requestPayload = dispatch.mock.calls[0][0].payload;

        expect(Object.keys(requestPayload).length).toBe(3);
        expect(requestPayload.text).toEqual(text);
        expect(requestPayload.id).toEqual(itemId);
        expect(requestPayload.isUpdating).toBeTruthy();
      });
    });
  });

  it('should set id and fetched id in payload in success action', () => {
    return postItemFactory(fetchCreated)('text', generateId())(dispatch).then(() => {
      const successPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(successPayload).length).toBe(2);
      expect(successPayload.id).toEqual(itemId);
      expect(successPayload.fetchedId).toEqual(fetchedId);
    });
  });

  it('calls request and fail actions if the fetch response failed', () => {
    return postItemFactory(fetchBadRequest)('text', generateId())(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_FAIL);
    });
  });

  it('should set id and error in payload in fail action', () => {
    return postItemFactory(fetchBadRequest)('text', generateId())(dispatch).then(() => {
      const failPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(failPayload).length).toBe(2);
      expect(failPayload.id).toEqual(itemId);
      expect(failPayload.error).toBeDefined();
    });
  });
});
