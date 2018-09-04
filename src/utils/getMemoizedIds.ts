import * as memoizee from 'memoizee';
import { Seq } from 'immutable';

export const getMemoizedIds = memoizee((items: Seq.Indexed<Uuid>) => items, {primitive: true});
