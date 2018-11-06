import { ItemsState } from './ItemsState';
import { ErrorsState } from './ErrorsState';

export interface IStore {
  readonly items: ItemsState;
  readonly isFetching: boolean;
  readonly errors: ErrorsState;
  readonly fetchingItemsFail: boolean;
}
