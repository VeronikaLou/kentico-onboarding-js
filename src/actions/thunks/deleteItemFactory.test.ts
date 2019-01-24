import { deleteItemFactory } from './deleteItemFactory';
import {
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
} from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import Mock = jest.Mock;

describe('Delete item', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const performDelete = jest.fn(() => Promise.resolve());
  const getFailedFetch = jest.fn(() => Promise.reject(new Error('Invalid response.')));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const deleteItem = deleteItemFactory({performDelete});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUEST);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_SUCCESS);

  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const deleteItem = deleteItemFactory({performDelete: getFailedFetch});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_REQUEST);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_FAIL);
  });

  [performDelete, getFailedFetch].forEach(fetch => {
    it('should set id in payload in request action', async () => {
      const deleteItem = deleteItemFactory({performDelete: fetch});
      const dispatchable = deleteItem(itemId);

      await dispatchable(dispatch);
      const requestPayload = dispatch.mock.calls[0][0].payload;

      expect(Object.keys(requestPayload).length).toBe(1);
      expect(requestPayload.id).toEqual(itemId);
    });
  });

  it('should set id in payload in success action', async () => {
    const deleteItem = deleteItemFactory({performDelete});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(1);
    expect(successPayload.id).toEqual(itemId);
  });

  it('should set id and error in payload in fail action', async () => {
    const deleteItem = deleteItemFactory({performDelete: getFailedFetch});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);
    const failPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(failPayload).length).toBe(2);
    expect(failPayload.id).toEqual(itemId);
    expect(failPayload.error).toBeDefined();
  });
});
