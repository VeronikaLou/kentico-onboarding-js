import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';

export type ItemsState = OrderedMap<Uuid, ListItem>;
