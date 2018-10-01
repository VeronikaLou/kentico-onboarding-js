export interface IFetchedItem {
  readonly id: Uuid;
  readonly text: string;
  readonly lastUpdateTime: string;
  readonly creationTime: string;
}
