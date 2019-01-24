import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAILED, ITEM_DELETE_FAILED, ITEM_SAVE_FAILED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { IStore } from '../../store/types/IStore';

interface IRetryActions {
  readonly deleteItem: (id: Uuid) => ((dispatch: Dispatch<IListAction>) => Promise<IListAction>);
  readonly postItem: (text: string, id: Uuid) => ((dispatch: Dispatch<IListAction>) => Promise<IListAction>);
  readonly putItem: (id: Uuid, text: string) => ((Dispatch: Dispatch<IListAction>) => Promise<IListAction>);
}

export const retryFactory =
  ({deleteItem, postItem, putItem}: IRetryActions) =>
    (error: ListError) =>
      (dispatch: Dispatch<IListAction>, getState: () => IStore): Promise<IListAction> => {
        const item = getState().items.get(error.itemId);
        switch (error.action) {
          case ITEM_DELETE_FAILED:
            return dispatch(deleteItem(item.id));

          case ITEM_ADD_FAILED:
            return dispatch(postItem(item.text, item.id));

          case ITEM_SAVE_FAILED:
            return dispatch(putItem(item.id, item.text));

          default:
            throw 'Invalid action was dispatched.';
        }
      };
