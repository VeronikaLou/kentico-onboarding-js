import { ListError } from '../../models/ListError';
import { ITEM_ADD_FAIL, ITEM_DELETE_FAIL, ITEM_SAVE_FAIL } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { IStore } from '../../store/types/IStore';

interface IRetryActions {
  readonly deleteItem: (id: Uuid) => ((dispatch: Dispatch<IListAction>) => Promise<IListAction>);
  readonly postItem: (text: string, id: Uuid) => ((dispatch: Dispatch<IListAction>) => Promise<IListAction>);
  readonly putItem: (id: Uuid, text: string, backupText: string) => ((Dispatch: Dispatch<IListAction>) => Promise<IListAction>);
}

export const retryFactory =
  ({deleteItem, postItem, putItem}: IRetryActions) =>
    (error: ListError) =>
      (dispatch: Dispatch<IListAction>, getState: () => IStore): Promise<IListAction> => {
        const item = getState().items.get(error.itemId);
        switch (error.action) {
          case ITEM_DELETE_FAIL:
            return dispatch(deleteItem(item.id));

          case ITEM_ADD_FAIL:
            return dispatch(postItem(item.text, item.id));

          case ITEM_SAVE_FAIL:
            return dispatch(putItem(item.id, item.text, item.backupText));

          default:
            throw 'Invalid action was dispatched.';
        }
      };
