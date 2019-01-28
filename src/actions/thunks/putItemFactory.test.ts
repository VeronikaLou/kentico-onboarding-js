import { putItemFactory } from './putItemFactory';
import { ITEM_SAVE_FAILED, ITEM_SAVE_STARTED, ITEM_SAVE_SUCCEEDED } from '../types/listActionTypes';
import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import Mock = jest.Mock;

describe('Put item', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const itemText = 'updated';
  const getItemSuccessfully = jest.fn((id: Uuid, text: string) => Promise.resolve({id, text}));
  const getItemUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));
  const failedAndSucceededItem = [getItemUnsuccessfully, getItemSuccessfully];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const putItem = putItemFactory({getFetchedItem: getItemSuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_SUCCEEDED);
  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const putItem = putItemFactory({getFetchedItem: getItemUnsuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_SAVE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_SAVE_FAILED);
  });

  failedAndSucceededItem.forEach(getFetchedItem => {
    it('should set id, text, backupText and isUpdating in payload in request action', async () => {
      const backupText = 'backup';
      const putItem = putItemFactory({getFetchedItem});
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
    const putItem = putItemFactory({getFetchedItem: getItemSuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(1);
    expect(successPayload.id).toEqual(itemId);
  });

  it('should set id and error in payload in failed action', async () => {
    const putItem = putItemFactory({getFetchedItem: getItemUnsuccessfully});
    const dispatchable = putItem(itemId, itemText);

    await dispatchable(dispatch);
    const failPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(failPayload).length).toBe(2);
    expect(failPayload.id).toEqual(itemId);
    expect(failPayload.error).toBeDefined();
  });
});
