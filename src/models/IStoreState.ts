import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';

export interface IStoreState {
  items: OrderedMap<Uuid, ListItem>;
}
