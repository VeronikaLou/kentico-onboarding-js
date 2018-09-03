import { OrderedMap } from 'immutable';
import { Uuid } from '../utils/generateId';
import { ListItem } from './ListItem';

export interface IStoreState {
  items: OrderedMap<Uuid, ListItem>;
}
