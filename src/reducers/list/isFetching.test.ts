import { isFetching } from './isFetching';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { ITEMS_RECEIVE_SUCCESS, ITEMS_REQUESTED } from '../../actions/types/listActionTypes';

describe('IsFetching', () => {
  it('returns true when request items', () => {
    const items = {type: ITEMS_REQUESTED, payload: {}};

    const result = isFetching(undefined, items);

    expect(result).toBeTruthy();
  });

  it('returns false when receive items', () => {
    const items = {type: ITEMS_RECEIVE_SUCCESS, payload: {items: OrderedMap<Uuid, ListItem>()}};

    const result = isFetching(undefined, items);

    expect(result).toBeFalsy();
  });

  it('returns false with invalid action', () => {
    const invalid = {type: 'INVALID', payload: {}};

    const result = isFetching(undefined, invalid);

    expect(result).toBeFalsy();
  });
});
