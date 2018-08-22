import { generateId } from './generateId';

export const createItem = (id, text, isEdited = false) => (
  {
    id,
    text,
    isEdited
  }
);

export const createItems = () =>
  [
    createItem(generateId(), 'Make a coffee'),
    createItem(generateId(), 'Master React'),
    createItem(generateId(), 'Learn Redux'),
    createItem(generateId(), 'Help making Draft awesome')
  ];
