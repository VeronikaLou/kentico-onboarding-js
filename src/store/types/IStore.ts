import { ItemsState } from './ItemsState';
import { ErrorsState } from './ErrorsState';
import { BackupTextsState } from './BackupTextsState';

export interface IStore {
  readonly items: ItemsState;
  readonly isFetching: boolean;
  readonly errors: ErrorsState;
  readonly fetchingItemsFail: boolean;
  readonly backupTexts: BackupTextsState;
}
