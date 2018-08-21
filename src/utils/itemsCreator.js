import { OrderedMap, } from 'immutable';
import { ListItem } from '../models/ListItem';
import { generateId } from './generateId';

export const createItem = (id, text, isEdited) => {
  return new ListItem({ id, text, isEdited });
};

export const createItems = () => {
  const coffee = createItem(generateId(), 'Make a coffee');
  const react = createItem(generateId(), 'Master React');
  const redux = createItem(generateId(), 'Learn Redux');
  const draft = createItem(generateId(), 'Help making Draft awesome');

  const items = [
    [coffee.id, coffee],
    [react.id, react],
    [redux.id, redux],
    [draft.id, draft]
  ];

  return OrderedMap(items);
};
