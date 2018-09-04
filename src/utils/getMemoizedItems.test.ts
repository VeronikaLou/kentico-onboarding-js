import { OrderedMap } from 'immutable';
import { getMemoizedItems } from './getMemoizedItems';

describe('Get memoized items', () => {
  it('should return same result for same arrays', () => {
    const initialArray = new OrderedMap();
    initialArray.set('1', { a: 'a', b: 'b' });
    const derivatedArray = new OrderedMap(initialArray);

    const result = getMemoizedItems(initialArray);
    const result2 = getMemoizedItems(derivatedArray);

    expect(result).toBe(result2);
  });
});
