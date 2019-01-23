import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { ITEM_SAVE_FAIL } from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { saveItem, saveItemFail, saveItemSuccess } from '../listActionCreators';

export const putItemFactory =
  (getFetchedItem: (id: Uuid, text: string) => Promise<IFetchedItem>) =>
    (id: Uuid, text: string, backupText: string = '') =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(saveItem(id, text, backupText));

        try {
          const fetchedItem = await getFetchedItem(id, text);
          return dispatch(saveItemSuccess(fetchedItem.id));
        } catch (exception) {
          return dispatch(saveItemFail(
            id,
            createError(ITEM_SAVE_FAIL, 'Item Save failed.', id)),
          );
        }
      };
