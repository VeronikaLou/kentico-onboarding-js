import { Dispatch } from 'redux';
import { IListAction } from '../types/IListAction';
import { ITEM_ADD_FAILED } from '../types/listActionTypes';
import { createError } from '../../utils/errorsCreator';
import { addItem, addItemFail, addItemSuccess } from '../listActionCreators';
import { IFetchedItem } from '../../models/IFetchedItem';

interface IPostDeps {
  readonly getFetchedItem: (text: string) => Promise<IFetchedItem>;
}

export const postItemFactory =
  ({getFetchedItem}: IPostDeps) =>
    (id: Uuid, text: string) =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(addItem(id, text));

        try {
          const fetchedItem = await getFetchedItem(text);

          return dispatch(addItemSuccess(id, fetchedItem.id));
        } catch (exception) {
          return dispatch(addItemFail(
            id,
            createError(ITEM_ADD_FAILED, 'Item Add failed.', id)),
          );
        }
      };
