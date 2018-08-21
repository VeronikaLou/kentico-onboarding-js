import { Record } from 'immutable';

export class ImmutableItem extends Record({
  id: '',
  text: '',
  isEdited: false
}) {}
