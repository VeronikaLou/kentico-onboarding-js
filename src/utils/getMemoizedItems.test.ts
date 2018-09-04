import { OrderedMap } from 'immutable';
import { getMemoizedItems } from './getMemoizedItems';
import { ListItem } from '../models/ListItem';
import { Uuid } from './generateId';

describe('Get memoized items', () => {
  it('should return same result for same arrays', () => {
    const initialArray: OrderedMap<Uuid, ListItem> = OrderedMap();
    initialArray.set('1', new ListItem({ id: '1', text: 'text' }));
    const derivatedArray = OrderedMap(initialArray);

    const result = getMemoizedItems(initialArray.keySeq());
    const result2 = getMemoizedItems(derivatedArray.keySeq());

    expect(result).toBe(result2);
  });
});
