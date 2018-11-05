
import { ITEM_ADD_FAIL, ITEM_ADD_REQUESTED, ITEM_ADD_SUCCESS } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import Mock = jest.Mock;
import { postItemFactory } from '../postItemFactory';

describe('Post item', () => {
  let dispatch: Mock<Dispatch<IListAction>>;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  const itemId = '00000000-0000-0000-0000-000000000001';
  const fetchedId = '00000000-0000-0000-0000-000000000002';
  const createdFetch = jest.fn(() => Promise.resolve({
    status: 201,
    statusText: 'Created',
    json: () => ({id: fetchedId})
  }));

  const badRequestFetch = jest.fn(() => Promise.resolve({
    status: 400, statusText: 'Bad Request'
  }));

  it('calls request and success actions if the fetch response was successful', () => {
    postItemFactory(createdFetch)('text')(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_SUCCESS);
    });
  });

  [
    badRequestFetch,
    createdFetch
  ].forEach(fetch => {
    it('should set id, text and isUpdating in payload in request action', () => {
      const text = 'text';

      postItemFactory(fetch)(text, itemId)(dispatch).then(() => {
        const requestPayload = dispatch.mock.calls[0][0].payload;

        expect(Object.keys(requestPayload).length).toBe(3);
        expect(requestPayload.text).toEqual(text);
        expect(requestPayload.id).toEqual(itemId);
        expect(requestPayload.isUpdating).toBeTruthy();
      });
    });
  });

  it('should set id and fetched id in payload in success action', () => {
    postItemFactory(createdFetch)('text', itemId)(dispatch).then(() => {
      const successPayload = dispatch.mock.calls[1][0].payload;
      expect(Object.keys(successPayload).length).toBe(2);
      expect(successPayload.id).toEqual(itemId);
      expect(successPayload.fetchedId).toEqual(fetchedId);
    });
  });

  it('calls request and fail actions if the fetch response failed', () => {
    postItemFactory(badRequestFetch)('text')(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_FAIL);
    });
  });

  it('should set id and error in payload in fail action', () => {
    postItemFactory(badRequestFetch)('text', itemId)(dispatch).then(() => {
      const failPayload = dispatch.mock.calls[1][0].payload;
      expect(Object.keys(failPayload).length).toBe(2);
      expect(failPayload.id).toEqual(itemId);
      expect(failPayload.error).toBeDefined();
    });
  });
});
