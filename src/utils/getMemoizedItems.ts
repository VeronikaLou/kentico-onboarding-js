import memoizee from 'memoizee';

export const getMemoizedItems = memoizee(items => items.toArray());
