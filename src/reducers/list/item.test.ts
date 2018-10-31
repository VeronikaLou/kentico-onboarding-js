import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';
import { ListError } from '../../models/ListError';
import { changeItemEditingMode } from '../../actions/listActionCreators';
import { deleteItem, deleteItemFail } from '../../actions/thunks/deleteItemFactory';
import { saveItem, saveItemFail, saveItemSuccess } from '../../actions/thunks/putItemFactory';
import { addItem, addItemFail } from '../../actions/thunks/postItemFactory';
import { closeSaveError } from '../../actions/thunks/closeError';

describe('Save item, delete item, add item', () => {
  const listItem: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'I am list item.',
  });

  const saveDeleteAddActions = [
    deleteItem(listItem.id),
    saveItem(listItem.id, 'new text'),
    addItem(listItem.id, listItem.text)
  ];

  saveDeleteAddActions.forEach(action =>
    it('should change item\'s isUpdating to true', () => {
      const originItemIsUpdating = listItem.isUpdating;

      const result = item(listItem, action);
      const changedItemIsUpdating = result.isUpdating;

      expect(originItemIsUpdating).toBeFalsy();
      expect(changedItemIsUpdating).toBeTruthy();
    }));
});

describe('Add item', () => {
  const id = '00000000-0000-0000-0000-000000000001';
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const listItem: ListItem = new ListItem({
      id, text: 'I am new item.'
    });
    const action: IListAction = addItem(listItem.id, listItem.text);
    const expectedResult = new ListItem({...action.payload});

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const listItem: ListItem = new ListItem({id, text: 'I am new item.'});
    const action: IListAction = addItem(listItem.id, listItem.text);
    const initialState = new ListItem();
    const expectedResult = new ListItem({...action.payload});

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new empty item when passing invalid action', () => {
    const newItem: IListAction = {
      type: 'INVALID',
      payload: {
        id: '1',
      },
    };
    const expectedResult = new ListItem();

    const result = item(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Add item success', () => {
    const listItem: ListItem = new ListItem({id: '1', isUpdating: true});
    const newItem: IListAction = saveItemSuccess(listItem.id);

    it('old item\'s isUpdating should be true, new item\'s should be false', () => {
      const originIsUpdating = listItem.isUpdating;

      const result = item(listItem, newItem);
      const newItemIsUpdating = result.isUpdating;

      expect(newItemIsUpdating).toBeFalsy();
      expect(originIsUpdating).toBeTruthy();
    });
  }
);

describe('Add item fail, save item fail, delete item fail', () => {
  const itemId = '00000000-0000-0000-0000-000000000001';
  const errorId = '00000000-0000-0000-0000-000000000002';
  const listItem: ListItem = new ListItem({
    id: itemId,
    text: 'text',
    isUpdating: true,
  });

  const error: ListError = new ListError({errorId, itemId});

  const failActions = [
    addItemFail(listItem.id, error),
    saveItemFail(listItem.id, error),
    deleteItemFail(listItem.id, error)
  ];

  failActions.forEach(action =>
    it('should set isUpdating to false', () => {
      const originItemIsUpdating = listItem.isUpdating;

      const result = item(listItem, action);
      const changedItemIsUpdating = result.isUpdating;

      expect(originItemIsUpdating).toBeTruthy();
      expect(changedItemIsUpdating).toBeFalsy();
    }));
});


describe('Save item changes', () => {
  const action: IListAction = saveItem('1', 'saved');

  it('should return new item with same values as action\'s payload with undefined state', () => {
    const expectedResult = new ListItem({...action.payload});

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const initialState = new ListItem();
    const expectedResult = new ListItem({...action.payload});

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});

describe('Save item success', () => {
  const listItem: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    isUpdating: true,
    text: 'text',
  });
  const itemSaveSuccess: IListAction = saveItemSuccess(listItem.id);

  it('should change isUpdating to false', () => {
    const originItemIsUpdating = listItem.isUpdating;

    const result = item(listItem, itemSaveSuccess);
    const savedItemIsUpdating = result.isUpdating;

    expect(originItemIsUpdating).toBeTruthy();
    expect(savedItemIsUpdating).toBeFalsy();
  });
});

describe('Close save item', () => {
  const backupText = 'Backup text.';
  const listItem: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Save me.',
  });
  const savedItem: IListAction = closeSaveError(listItem.id, backupText);

  it('should change text', () => {
    const originItemText = listItem.text;

    const result = item(listItem, savedItem);
    const savedItemText = result.text;

    expect(originItemText).toEqual(listItem.text);
    expect(savedItemText).toEqual(backupText);
  });
});

describe('Change item editing mode', () => {
  const itemWithFalseMode: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Click me.',
  });
  const clickedItem: IListAction = changeItemEditingMode(itemWithFalseMode.id);
  const itemWithTrueMode: ListItem = new ListItem({
    id: itemWithFalseMode.id,
    text: itemWithFalseMode.text,
    isEdited: true
  });

  it('should change mode from false to true', () => {
    const result = item(itemWithFalseMode, clickedItem);

    expect(result).toEqual(itemWithTrueMode);
  });

  it('should change mode from true to false', () => {
    const result = item(itemWithTrueMode, clickedItem);

    expect(result).toEqual(itemWithFalseMode);
  });
});
