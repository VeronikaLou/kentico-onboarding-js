import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';

export interface IStore {
  items: OrderedMap<Uuid, ListItem>;
}
