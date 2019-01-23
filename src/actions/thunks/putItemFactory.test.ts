import { putItemFactory } from './putItemFactory';
import { ITEM_SAVE_FAIL, ITEM_SAVE_REQUEST, ITEM_SAVE_SUCCESS } from '../types/listActionTypes';
import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import { IFetchedItem } from '../../models/IFetchedItem';
import { validatePutResponse } from '../../utils/responseValidator';
import Mock = jest.Mock;

describe('Put item', () => {
  const getFetchedItem =
    (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
      async (id: Uuid, text: string): Promise<IFetchedItem> => {
        const response: Response = await fetch(
          'v1/List/' + id,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, text}),
          });

        return await validatePutResponse(response);
      };

  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const itemText = 'updated';
  const fetchOk = jest.fn(() => Promise.resolve({
    status: 200,
    statusText: 'OK',
    json: () => ({id: itemId, text: itemText}),
    ok: true,
  }));

  const fetchNotFound = jest.fn(() => Promise.resolve({
    status: 404,
    statusText: 'Not Found',
  }));

  const fetchBadRequest = jest.fn(() => Promise.resolve({
    status: 400,
    statusText: 'Bad Request',
  }));

  const invalidFetchCases = [fetchNotFound, fetchBadRequest];
  const allFetchCases = [...invalidFetchCases, fetchOk];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const putItem = putItemFactory(getFetchedItem(fetchOk));
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_REQUEST);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_SUCCESS);
  });

  invalidFetchCases.forEach(fetch => {
    it('dispatches request and fail actions if the fetch response failed', async () => {
      const putItem = putItemFactory(getFetchedItem(fetch));
      const dispatchable = putItem(itemId, itemText);

      await dispatchable(dispatch);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_REQUEST);
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_FAIL);
    });
  });

  allFetchCases.forEach(fetch => {
    it('should set id, text, backupText and isUpdating in payload in request action', async () => {
      const backupText = 'backup';
      const putItem = putItemFactory(getFetchedItem(fetch));
      const dispatchable = putItem(itemId, itemText, backupText);

      await dispatchable(dispatch);
      const requestPayload = dispatch.mock.calls[0][0].payload;

      expect(Object.keys(requestPayload).length).toBe(4);
      expect(requestPayload.id).toEqual(itemId);
      expect(requestPayload.text).toEqual(itemText);
      expect(requestPayload.isUpdating).toBeTruthy();
      expect(requestPayload.backupText).toEqual(backupText);
    });
  });

  it('should set id in payload in success action', async () => {
    const putItem = putItemFactory(getFetchedItem(fetchOk));
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(1);
    expect(successPayload.id).toEqual(itemId);
  });

  invalidFetchCases.forEach(fetch => {
    it('should set id and error in payload in failed action', async () => {
      const putItem = putItemFactory(getFetchedItem(fetch));
      const dispatchable = putItem(itemId, itemText);

      await dispatchable(dispatch);
      const failPayload = dispatch.mock.calls[1][0].payload;

      expect(Object.keys(failPayload).length).toBe(2);
      expect(failPayload.id).toEqual(itemId);
      expect(failPayload.error).toBeDefined();
    });
  });
});
