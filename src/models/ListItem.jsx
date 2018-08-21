import { Record } from 'immutable';

const emptyItem = {
  id: '',
  text: '',
  isEdited: false
};

export const ListItem = new Record(emptyItem);
