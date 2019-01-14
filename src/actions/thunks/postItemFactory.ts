import { Dispatch } from 'redux';
import { IListAction } from '../types/IListAction';
import { ITEM_ADD_FAIL } from '../types/listActionTypes';
import { createError } from '../../utils/errorsCreator';
import { validatePostResponse } from '../../utils/responseValidator';
import { addItem, addItemFail, addItemSuccess } from '../listActionCreators';

export const postItemFactory =
  (fetch: (input?: Request | string, init?: RequestInit) => Promise<Response>) =>
    (text: string, itemId: Uuid) =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(addItem(itemId, text));

        try {
          const response: Response = await fetch(
            'v1/List/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({text}),
            });

          const fetchedItem = await validatePostResponse(response);

          return dispatch(addItemSuccess(itemId, fetchedItem.id));
        } catch (exception) {
          return dispatch(addItemFail(
            itemId,
            createError(ITEM_ADD_FAIL, 'Item Add failed.', itemId)),
          );
        }
      };
