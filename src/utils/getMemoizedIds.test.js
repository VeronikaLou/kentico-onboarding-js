import { OrderedMap } from 'immutable';
import { getMemoizedItems } from './getMemoizedIds';
import { generateId } from './generateId';

describe('Get memoized items', () => {
  it('should return same result for same arrays', () => {
    const initialArray = new OrderedMap().set(generateId(), { a: 'a', b: 'b' });
    const derivatedArray = new OrderedMap(initialArray);

    const result = getMemoizedItems(initialArray.keySeq());
    const result2 = getMemoizedItems(derivatedArray.keySeq());

    expect(result).toBe(result2);
  });
});
