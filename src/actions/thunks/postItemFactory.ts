import { IListAction } from '../types/IListAction';
import { addItem, addItemSuccess } from '../listActionCreators';
import { IFetchedItem } from '../../models/IFetchedItem';
import { Dispatch } from '../types/Dispatcher';
import { generateId } from '../../utils/generateId';

interface IPostDeps {
  readonly createItem: (text: string) => Promise<IFetchedItem>;
}

export const postItemFactory =
  ({createItem}: IPostDeps) =>
    (text: string) =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        const id = generateId();
        dispatch(addItem(id, text));

        try {
          const fetchedItem: IFetchedItem = await createItem(text);

          return dispatch(addItemSuccess(id, fetchedItem.id));
        } catch (exception) {
          throw 'Post failed';
        }
      };
