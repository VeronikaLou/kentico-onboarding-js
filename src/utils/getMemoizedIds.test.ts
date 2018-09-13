import { OrderedMap } from 'immutable';
import { getMemoizedIds } from './getMemoizedIds';
import { generateId } from './generateId';

describe('Get memoized ids', () => {
  it('should return same result for same arrays', () => {
    const initialArray = OrderedMap<Uuid, {}>().set(generateId(), { a: 'a', b: 'b' });
    const derivatedArray = OrderedMap(initialArray);

    const result = getMemoizedIds(initialArray.keySeq().toArray());
    const result2 = getMemoizedIds(derivatedArray.keySeq().toArray());

    expect(result).toBe(result2);
  });
});
