import * as memoizee from 'memoizee';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import { Uuid } from './generateId';

export const getMemoizedItems: OrderedMap<Uuid, ListItem>  = memoizee((items: OrderedMap<Uuid, ListItem>) => items.toArray());
