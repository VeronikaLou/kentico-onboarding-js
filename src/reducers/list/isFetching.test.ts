import { receiveItems, requestItems } from '../../actions/listActionCreators';
import { isFetching } from './isFetching';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';

describe('IsFetching', () => {
  it('returns true when request items', () => {
    const items = requestItems();

    const result = isFetching(undefined, items);

    expect(result).toBeTruthy();
  });

  it('returns false when receive items', () => {
    const items = receiveItems(OrderedMap<Uuid, ListItem>());

    const result = isFetching(undefined, items);

    expect(result).toBeFalsy();
  });

  it('returns false with invalid action', () => {
    const invalid = {type: 'INVALID', payload: {}};

    const result = isFetching(undefined, invalid);

    expect(result).toBeFalsy();
  });
});
