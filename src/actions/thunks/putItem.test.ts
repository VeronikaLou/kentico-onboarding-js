import { putItemFactory } from './putItemFactory';
import { ITEM_SAVE_FAIL, ITEM_SAVE_REQUESTED, ITEM_SAVE_SUCCESS } from '../types/listActionTypes';

describe('Put item', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
  });
  const itemId = '00000000-0000-0000-0000-000000000001';
  const itemText = 'updated';
  const okFetch = jest.fn(() => Promise.resolve({status: 200, statusText: 'Ok', json: () => ({id: itemId, text: itemText})}));
  const notFoundFetch = jest.fn(() => Promise.resolve({status: 404, statusText: 'Not Found'}));
  const badRequestFetch = jest.fn(() => Promise.resolve({status: 400, statusText: 'Bad Request'}));

  it('calls request and success actions if the fetch response was successful', () => {
    putItemFactory(okFetch)(itemId, itemText)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_REQUESTED);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_SUCCESS);
    });
  });

  [
    notFoundFetch,
    badRequestFetch
  ].forEach(fetch => {
    it('calls request and fail actions if the fetch response failed', () => {
      putItemFactory(fetch)(itemId, itemText)(dispatch).then(() => {
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_REQUESTED);
        expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_FAIL);
      });
    });
  });

  [
    okFetch,
    badRequestFetch,
    notFoundFetch
  ].forEach(fetch => {
    it('should set id, text, backupText and isUpdating in payload in request action', () => {
      const backupText = 'backup';

      putItemFactory(fetch)(itemId, itemText, backupText)(dispatch).then(() => {
        const requestPayload = dispatch.mock.calls[0][0].payload;

        expect(Object.keys(requestPayload).length).toBe(4);
        expect(requestPayload.id).toEqual(itemId);
        expect(requestPayload.text).toEqual(itemText);
        expect(requestPayload.isUpdating).toBeTruthy();
        expect(requestPayload.backupText).toEqual(backupText);
      });
    });
  });

  it('should set id in payload in success action', () => {
    putItemFactory(okFetch)(itemId, itemText)(dispatch).then(() => {
      const successPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(successPayload).length).toBe(1);
      expect(successPayload.id).toEqual(itemId);
    });
  });

  [
    badRequestFetch,
    notFoundFetch
  ].forEach(fetch => {
    it('should set id and error in payload in failed action', () => {
      putItemFactory(fetch)(itemId, itemText)(dispatch).then(() => {
        const failPayload = dispatch.mock.calls[1][0].payload;

        expect(Object.keys(failPayload).length).toBe(2);
        expect(failPayload.id).toEqual(itemId);
        expect(failPayload.error).toBeDefined();
      });
    });
  });
});
