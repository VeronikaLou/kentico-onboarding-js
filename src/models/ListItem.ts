import { BaseRecord } from './BaseRecord';

interface IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isUpdating: boolean;
  readonly error: string | undefined;
}

const emptyItem: IListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isEdited: false,
  isUpdating: false,
  error: undefined,
};

export class ListItem extends BaseRecord(emptyItem, 'ListItem') implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isUpdating: boolean;
  readonly error: string;
}
