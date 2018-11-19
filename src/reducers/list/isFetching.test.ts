import { isFetching } from './isFetching';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { itemsFetchSuccess, requestItems } from '../../actions/thunks/getItemsFactory';

describe('IsFetching', () => {
  it('returns true when request items', () => {
    const request = requestItems();

    const result = isFetching(undefined, request);

    expect(result).toBeTruthy();
  });

  it('returns false when receive items', () => {
    const receive = itemsFetchSuccess(OrderedMap<Uuid, ListItem>());

    const result = isFetching(undefined, receive);

    expect(result).toBeFalsy();
  });

  it('returns false with invalid action', () => {
    const invalid = {type: 'INVALID', payload: {}};

    const result = isFetching(undefined, invalid);

    expect(result).toBeFalsy();
  });
});
