import { generateId } from './generateId';

export const createItems = () =>
  [
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
