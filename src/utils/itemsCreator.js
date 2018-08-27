import { OrderedMap, } from 'immutable';
import { ListItem } from '../models/ListItem';
import { generateId } from './generateId';

export const createItems = () => {
  const coffee = new ListItem({
    id: generateId(),
    text: 'Make a coffee'
  });
  const react = new ListItem({
    id: generateId(),
    text: 'Master React'
  });
  const redux = new ListItem({
    id: generateId(),
    text: 'Learn Redux'
  });

  const draft = new ListItem({
    id: generateId(),
    text: 'Help making Draft awesome'
  });

  const items = [
    [coffee.id, coffee],
    [react.id, react],
    [redux.id, redux],
    [draft.id, draft]
  ];

  return OrderedMap(items);
};
