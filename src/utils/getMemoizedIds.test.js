import { OrderedMap } from 'immutable';
import { getMemoizedIds } from './getMemoizedIds';
import { generateId } from './generateId';

describe('Get memoized items', () => {
  it('should return same result for same arrays', () => {
    const initialArray = new OrderedMap().set(generateId(), { a: 'a', b: 'b' });
    const derivatedArray = new OrderedMap(initialArray);

    const result = getMemoizedIds(initialArray.keySeq());
    const result2 = getMemoizedIds(derivatedArray.keySeq());

    expect(result).toBe(result2);
  });
});
