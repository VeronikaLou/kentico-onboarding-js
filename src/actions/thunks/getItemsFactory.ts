import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import { ItemsState } from '../../store/types/ItemsState';
import { itemsFetchFail, itemsFetchSuccess, requestItems } from '../listActionCreators';

interface IGetDeps {
  readonly getItems: () => Promise<ItemsState>;
}

export const getItemsFactory =
  ({getItems}: IGetDeps) =>
    () =>
      async (dispatch: Dispatch<IListAction>): Promise<IListAction> => {
        dispatch(requestItems());

        try {
          const items = await getItems();

          return dispatch(itemsFetchSuccess(items));
        } catch (exception) {
          return dispatch(itemsFetchFail());
        }
      };
