import { OrderedMap } from 'immutable';
import { ListError } from '../../models/ListError';
import { ListItem } from '../../models/ListItem';
import { addItemFail, addItemSuccess } from '../../actions/postItem';
import { errors } from './errors';
import { saveItem, saveItemFail } from '../../actions/putItem';
import { deleteItem, deleteItemFail } from '../../actions/fetchDeleteItem';
import { deleteItemSuccess, saveItemSuccess } from '../../actions/listActionCreators';
import { closeSaveItem } from '../../actions/closeError';

describe('Fail', () => {

  const item = new ListItem({id: '00000000-0000-0000-0000-0000001'});
  const error = new ListError({itemId: item.id, errorId: '00000000-0000-0000-0000-0000002'});

  [
    addItemFail(item.id, error),
    saveItemFail(item.id, error),
    deleteItemFail(item.id, error)
  ].forEach(failedItem =>
    it('should add error to state', () => {
      const expectedResult = OrderedMap<Uuid, ListError>().set(error.errorId, error);

      const result = errors(undefined, failedItem);

      expect(result).toEqual(expectedResult);
    }));
});

describe('Success, save, delete, close save', () => {
  const errorId = '00000000-0000-0000-0000-0000002';
  const item = new ListItem({id: '00000000-0000-0000-0000-0000001', error: errorId});
  const error = new ListError({itemId: item.id, errorId: errorId});
  const initialState = OrderedMap<Uuid, ListError>().set(error.errorId, error);

  [
    addItemSuccess(item.id, '00000000-0000-0000-0000-0000003'),
    saveItemSuccess(item.id),
    deleteItemSuccess(item.id),
    saveItem(item.id, 'save me'),
    deleteItem(item.id),
    closeSaveItem(item.id, 'backup text'),
  ].forEach(failedItem =>
    it('should remove error', () => {
      const result = errors(initialState, failedItem);

      expect(result).toEqual(OrderedMap<Uuid, ListError>());
    }));
});
