import { ItemsState } from './ItemsState';
import { ErrorsState } from './ErrorsState';

export interface IStore {
  readonly items: ItemsState;
  readonly isFetching: boolean;
  readonly fetchingItemsFail: boolean;
  readonly errors: ErrorsState;
}
