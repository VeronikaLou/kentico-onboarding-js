import { BaseRecord } from './BaseRecord';

interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
}

const emptyItem: IListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isEdited: false,
};

export class ListItem extends BaseRecord(emptyItem, 'ListItem') implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
}
