import { IListAction } from '../types/IListAction';
import { ITEM_DELETE_FAIL } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { deleteItem, deleteItemFail, deleteItemSuccess } from '../listActionCreators';

interface IDeleteDeps {
  readonly performDelete: (id: Uuid) => Promise<void>;
}

export const deleteItemFactory =
  ({performDelete}: IDeleteDeps) =>
    (id: Uuid) =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(deleteItem(id));

        try {
          await performDelete(id);

          return dispatch(deleteItemSuccess(id));
        } catch (exception) {
          return dispatch(deleteItemFail(
            id,
            createError(ITEM_DELETE_FAIL, 'Item Delete failed.', id)),
          );
        }
      };
