import * as memoizee from 'memoizee';
import { Uuid } from './generateId';
import { Seq } from 'immutable';

export const getMemoizedIds = memoizee((items: Seq.Indexed<Uuid>) => items, {primitive: true});
