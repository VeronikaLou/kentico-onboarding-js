import memoizee from 'memoizee';

export const getMemoizedIds = memoizee(items => items, { primitive: true });
