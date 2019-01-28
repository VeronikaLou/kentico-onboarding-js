import { IListAction } from '../types/IListAction';
import { ITEM_DELETE_FAILED } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { deleteItem, deleteItemFail, deleteItemSuccess } from '../listActionCreators';

interface IDeleteDeps {
  readonly performDeletion: (id: Uuid) => Promise<void>;
}

export const deleteItemFactory =
  ({performDeletion}: IDeleteDeps) =>
    (id: Uuid) =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(deleteItem(id));

        try {
          await performDeletion(id);

          return dispatch(deleteItemSuccess(id));
        } catch (exception) {
          return dispatch(deleteItemFail(
            id,
            createError(ITEM_DELETE_FAILED, 'Item Delete failed.', id)),
          );
        }
      };
