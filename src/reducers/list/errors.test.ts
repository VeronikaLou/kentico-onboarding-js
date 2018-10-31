import { OrderedMap } from 'immutable';
import { ListError } from '../../models/ListError';
import { ListItem } from '../../models/ListItem';
import { errors } from './errors';
import { addItem, addItemFail } from '../../actions/thunks/postItemFactory';
import { saveItem, saveItemFail } from '../../actions/thunks/putItemFactory';
import { deleteItem, deleteItemFail } from '../../actions/thunks/deleteItemFactory';
import { closeAddError, closeDeleteError, closeSaveError } from '../../actions/thunks/closeError';

describe('Fail', () => {
  const itemId = '00000000-0000-0000-0000-0000001';
  const errorId = '00000000-0000-0000-0000-0000002';
  const item = new ListItem({id: itemId});
  const error = new ListError({itemId, errorId});
  const failedActions = [
    addItemFail(item.id, error),
    saveItemFail(item.id, error),
    deleteItemFail(item.id, error)
  ];

  failedActions.forEach(failedItem =>
    it('should add error to state', () => {
      const expectedResult = OrderedMap<Uuid, ListError>().set(error.errorId, error);

      const result = errors(undefined, failedItem);

      expect(result).toEqual(expectedResult);
    }));
});

describe('Requests, close error actions', () => {
  const itemId = '00000000-0000-0000-0000-0000001';
  const errorId = '00000000-0000-0000-0000-0000002';
  const item = new ListItem({id: itemId});
  const error = new ListError({itemId, errorId});
  const initialState = OrderedMap<Uuid, ListError>().set(error.errorId, error);
  const requestOrCloseErrorActions = [
    saveItem(item.id, 'save me', ''),
    deleteItem(item.id),
    addItem(item.id, 'add me'),
    closeSaveError(item.id, 'backup text'),
    closeAddError(item.id),
    closeDeleteError(item.id)
  ];

  requestOrCloseErrorActions.forEach(action =>
    it('should remove error', () => {
      const result = errors(initialState, action);

      expect(result).toEqual(OrderedMap<Uuid, ListError>());
    }));
});
