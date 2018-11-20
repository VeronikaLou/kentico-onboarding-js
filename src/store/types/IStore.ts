import { ItemsState } from './ItemsState';

export interface IStore {
  readonly items: ItemsState;
  readonly isFetching: boolean;
}
