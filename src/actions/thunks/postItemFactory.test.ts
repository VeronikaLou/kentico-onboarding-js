import { ITEM_ADD_FAILED, ITEM_ADD_STARTED, ITEM_ADD_SUCCEEDED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { postItemFactory } from './postItemFactory';
import Mock = jest.Mock;

describe('Post item', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const generateId = jest.fn(() => itemId);
  const fetchedId = '00000000-0000-0000-0000-000000000002';
  const getItemSuccessfully = jest.fn((text: string) => Promise.resolve({id: fetchedId, text}));
  const getItemUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));
  const failedAndSucceededItem = [getItemSuccessfully, getItemUnsuccessfully];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const postItem = postItemFactory({getFetchedItem: getItemSuccessfully});
    const dispatchable = postItem(generateId(), 'text');

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_SUCCEEDED);
  });

  failedAndSucceededItem.forEach(getFetchedItem => {
    it('should set id, text and isUpdating in payload in request action', async () => {
      const text = 'text';
      const postItem = postItemFactory({getFetchedItem});
      const dispatchable = postItem(generateId(), 'text');

      await dispatchable(dispatch);
      const requestPayload = dispatch.mock.calls[0][0].payload;

      expect(Object.keys(requestPayload).length).toBe(3);
      expect(requestPayload.text).toEqual(text);
      expect(requestPayload.id).toEqual(itemId);
      expect(requestPayload.isUpdating).toBeTruthy();
    });
  });

  it('should set id and fetched id in payload in success action', async () => {
    const postItem = postItemFactory({getFetchedItem: getItemSuccessfully});
    const dispatchable = postItem(generateId(), 'text');

    await dispatchable(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(2);
    expect(successPayload.id).toEqual(itemId);
    expect(successPayload.fetchedId).toEqual(fetchedId);
  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const postItem = postItemFactory({getFetchedItem: getItemUnsuccessfully});
    const dispatchable = postItem(generateId(), 'text');

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_ADD_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_ADD_FAILED);
  });

  it('should set id and error in payload in fail action', async () => {
    const postItem = postItemFactory({getFetchedItem: getItemUnsuccessfully});
    const dispatchable = postItem(generateId(), 'text');

    await dispatchable(dispatch);
    const failPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(failPayload).length).toBe(2);
    expect(failPayload.id).toEqual(itemId);
    expect(failPayload.error).toBeDefined();
  });
});
