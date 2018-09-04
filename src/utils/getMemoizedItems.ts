import * as memoizee from 'memoizee';
import { Uuid } from './generateId';
import { Seq } from 'immutable';

export const getMemoizedItems = memoizee((items: Seq.Indexed<Uuid>) => items);
