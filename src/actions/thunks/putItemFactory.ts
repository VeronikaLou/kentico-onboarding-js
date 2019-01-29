import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { Dispatch } from '../types/Dispatcher';
import { saveItem, saveItemSuccess } from '../listActionCreators';

interface IPutDeps {
  readonly updateItem: (id: Uuid, text: string) => Promise<IFetchedItem>;
}

export const putItemFactory =
  ({updateItem}: IPutDeps) =>
    (id: Uuid, text: string, backupText: string = '') =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        dispatch(saveItem(id, text, backupText));

        try {
          const fetchedItem: IFetchedItem = await updateItem(id, text);

          return dispatch(saveItemSuccess(fetchedItem.id));
        } catch (exception) {
          throw 'Put failed';
        }
      };
