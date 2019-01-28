import { getItemsFactory } from './getItemsFactory';
import { ITEMS_FETCH_FAILED, ITEMS_FETCH_SUCCEEDED, ITEMS_FETCH_STARTED } from '../types/listActionTypes';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import Mock = jest.Mock;

describe('Get items', () => {
  const dispatch: Mock<Dispatch<IListAction>> = jest.fn();
  const getItemsSuccessfully = jest.fn(() => Promise.resolve(OrderedMap<Uuid, ListItem>()));
  const getItemsUnsuccessfully = jest.fn(() => Promise.reject(new Error('Invalid response.')));
  const failedAndSucceededItems = [getItemsSuccessfully, getItemsUnsuccessfully];

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('calls request and success actions if the fetch response was successful', async () => {
    const dispatchableGetItems = getItemsFactory({getItems: getItemsSuccessfully})();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCH_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_SUCCEEDED);

  });

  it('calls request and fail actions if the fetch response failed', async () => {
    const dispatchableGetItems = getItemsFactory({getItems: getItemsUnsuccessfully})();

    await dispatchableGetItems(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCH_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCH_FAILED);
  });

  failedAndSucceededItems.forEach(getItems => {
    it('payload should be null in request action', async () => {
      const dispatchableGetItems = getItemsFactory({getItems})();

      await dispatchableGetItems(dispatch);
      const requestPayload = dispatch.mock.calls[0][0].payload;

      expect(requestPayload).toBeNull();
    });
  });

  it('should set items in payload in success action', async () => {
    const dispatchableGetItems = getItemsFactory({getItems: getItemsSuccessfully})();

    await dispatchableGetItems(dispatch);
    const successPayload = dispatch.mock.calls[1][0].payload;

    expect(Object.keys(successPayload).length).toBe(1);
    expect(successPayload.items).toEqual(OrderedMap<Uuid, ListItem>());
  });

  it('should set payload to null in fail action', async () => {
    const dispatchableGetItems = getItemsFactory({getItems: getItemsUnsuccessfully})();

    await dispatchableGetItems(dispatch);
    const failPayload = dispatch.mock.calls[1][0].payload;

    expect(failPayload).toBeNull();
  });
});
