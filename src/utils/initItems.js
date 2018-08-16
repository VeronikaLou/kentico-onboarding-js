import { generateId } from './generateId';

export const initItems = () => {
  const items = [
    {
      id: generateId(),
      text: 'Make a coffee',
      isEdited: false
    },
    {
      id: generateId(),
      text: 'Master React',
      isEdited: false
    },
    {
      id: generateId(),
      text: 'Learn Redux',
      isEdited: false
    },
    {
      id: generateId(),
      text: 'Help making Draft awesome',
      isEdited: false
    }
  ];

  return items;
};
