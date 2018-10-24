import { BaseRecord } from './BaseRecord';

interface IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly message: string;
  readonly action: string;
  readonly backupText: string;
  }

const emptyError: IError = {
  errorId: '00000000-0000-0000-0000-000000000000',
  itemId: '00000000-0000-0000-0000-000000000000',
  message: '',
  action: '',
  backupText: '',
};

export class ListError extends BaseRecord(emptyError, 'Error') implements IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly message: string;
  readonly action: string;
  readonly backupText: string;
}
