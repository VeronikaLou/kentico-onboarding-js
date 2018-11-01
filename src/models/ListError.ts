import { BaseRecord } from './BaseRecord';

interface IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly message: string;
  readonly action: string;
}

const emptyError: IError = {
  errorId: '00000000-0000-0000-0000-000000000000',
  itemId: '00000000-0000-0000-0000-000000000000',
  message: '',
  action: '',
};

export class ListError extends BaseRecord(emptyError, 'ListError') implements IError {
  readonly errorId: Uuid;
  readonly itemId: Uuid;
  readonly message: string;
  readonly action: string;
}
