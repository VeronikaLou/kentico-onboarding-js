import memoizee from 'memoizee';

export const getMemoizedItems = memoizee(items => items, { primitive: true });
