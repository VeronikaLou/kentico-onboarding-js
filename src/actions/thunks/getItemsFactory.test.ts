import { getItemsFactory } from './getItemsFactory';
import { ITEMS_FETCH_FAIL, ITEMS_FETCH_SUCCESS, ITEMS_REQUEST, } from '../types/listActionTypes';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import Mock = jest.Mock;

describe('Get items', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const fetchOk = jest.fn(() => Promise.resolve({
    status: 200,
    statusText: 'OK',
    ok: true,
    json: () => ([]),
  }));

  const fetchTimeout = jest.fn(() => Promise.resolve({
    status: 504,
    statusText: 'Gateway Timeout',
  }));

  const fetchCases = [fetchOk, fetchTimeout];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('calls request and success actions if the fetch response was successful', async () => {
    const dispatchableGetItems = getItemsFactory(fetchOk)();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_REQUEST);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_SUCCESS);

  });

  it('calls request and fail actions if the fetch response failed', async () => {
    const dispatchableGetItems = getItemsFactory(fetchTimeout)();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_REQUEST);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_FAIL);
  });

  fetchCases.forEach(fetch => {
    it('payload should be null in request action', async () => {
      const dispatchableGetItems = getItemsFactory(fetch)();

      await dispatchableGetItems(dispatch);
      const requestPayload = dispatch.mock.calls[0][0].payload;

      expect(requestPayload).toBeNull();
    });
  });

  it('should set items in payload in success action', async () => {
    const dispatchableGetItems = getItemsFactory(fetchOk)();

    await dispatchableGetItems(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(1);
    expect(successPayload.items).toEqual(OrderedMap<Uuid, ListItem>());
  });

  it('should set payload to null in fail action', async () => {
    const dispatchableGetItems = getItemsFactory(fetchTimeout)();

    await dispatchableGetItems(dispatch);
    const failPayload = dispatch.mock.calls[1][0].payload;

    expect(failPayload).toBeNull();
  });
});
