import { OrderedMap } from 'immutable';
import { generateId } from './generateId';
import { ImmutableItem } from '../models/ImmutableItem';

export const createItem = (id, text, isEdited = false) => (
  {
    id,
    text,
    isEdited
  }
);

export const createItems = () => {
  const coffee = new ImmutableItem({
    id: generateId(),
    text: 'Make a coffee'
  });
  const react = new ImmutableItem({
    id: generateId(),
    text: 'Master React'
  });
  const redux = new ImmutableItem({
    id: generateId(),
    text: 'Learn Redux'
  });
  const draft = new ImmutableItem({
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
