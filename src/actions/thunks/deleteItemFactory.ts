import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import { initItemDelete, deleteItemSuccess } from '../listActionCreators';

interface IDeleteDeps {
  readonly removeItem: (id: Uuid) => Promise<void>;
}

export const deleteItemFactory =
  ({removeItem}: IDeleteDeps) =>
    (id: Uuid) =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        dispatch(initItemDelete(id));

        try {
          await removeItem(id);

          return dispatch(deleteItemSuccess(id));
        } catch (exception) {
          throw 'Delete failed';
        }
      };
