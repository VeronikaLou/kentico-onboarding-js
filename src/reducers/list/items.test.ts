import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items';
import {
  changeItemEditingMode,
  deleteItemSuccess,
} from '../../actions/listActionCreators';
import { IListAction } from '../../actions/types/IListAction';
import { ListError } from '../../models/ListError';
import { addItem, addItemFail, addItemSuccess } from '../../actions/postItem';
import { deleteItem, deleteItemFail } from '../../actions/fetchDeleteItem';
import { saveItem } from '../../actions/putItem';

describe('Add item', () => {
  const listItem: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000000',
    text: 'I am new item.'
  });
  const newItem: IListAction = addItem(listItem);
  const newListItem = new ListItem({...newItem.payload});
  const initialState = OrderedMap<Uuid, ListItem>()
    .set('0', new ListItem({id: '0', text: 'A'}))
    .set('1', new ListItem({id: '1', text: 'B'}));

  it('should add item into empty state', () => {
    const expectedResult = OrderedMap<Uuid, ListItem>()
      .set(newListItem.id, newListItem);

    const result = items(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });

  it('should add third item', () => {

    const expectedResult = initialState
      .set(newListItem.id, newListItem);

    const result = items(initialState, newItem);

    expect(result).toEqual(expectedResult);
  });

  it('should set item\'s isUpdating to true', () => {
    const originItemIsUpdating = listItem.isUpdating;

    const result = items(initialState, newItem);
    const addedItemIsUpdating = result.get(newListItem.id).isUpdating;

    expect(originItemIsUpdating).toBeFalsy();
    expect(addedItemIsUpdating).toBeTruthy();
  });

  it('invalid action shouldn\'t modify state', () => {
    const invalidItem: IListAction = {
      type: 'INVALID',
      payload: {id: '1'},
    };

    const result = items(initialState, invalidItem);

    expect(result).toEqual(initialState);
  });
});

describe('Add item success', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Add me.',
    isUpdating: true,
  });
  const newId = '00000000-0000-0000-0000-000000000002';
  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const newItem = addItemSuccess(item.id, newId);

  it('should add item with new id', () => {
    const result = items(initialState, newItem);
    const containsItem = result.get(newId);

    expect(containsItem).toBeDefined();
  });

  it('should delete item with old id', () => {
    const result = items(initialState, newItem);
    const containsItem = result.get(item.id);

    expect(containsItem).toBeUndefined();
  });

  it('should add item with new id and same text, remove item with old id', () => {
    const expectedResult = initialState
      .set(newId, new ListItem({id: newId, text: item.text}))
      .delete(item.id);

    const result = items(initialState, newItem);

    expect(result).toEqual(expectedResult);
  });

  it('isUpdating of old item is true, of new item is false', () => {
    const originIsUpdating = initialState.get(item.id).isUpdating;

    const result = items(initialState, newItem);
    const newItemIsUpdating = result.get(newId).isUpdating;

    expect(newItemIsUpdating).toBeFalsy();
    expect(originIsUpdating).toBeTruthy();
  });
});

describe('Add item fail', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    isUpdating: true,
  });

  const error: ListError = new ListError({
    itemId: item.id,
    errorId: '00000000-0000-0000-0000-000000000002',
  });

  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const failedItem = addItemFail(item.id, error);

  it('should set item\'s error', () => {
    const originItemError = initialState.get(item.id).error;

    const result = items(initialState, failedItem);
    const failedItemError = result.get(item.id).error;

    expect(originItemError).toBeUndefined();
    expect(failedItemError).toEqual(error.errorId);
  });

  it('should set isUpdating to false', () => {
    const originItemIsUpdating = initialState.get(item.id).isUpdating;

    const result = items(initialState, failedItem);
    const failedItemIsUpdating = result.get(item.id).isUpdating;

    expect(originItemIsUpdating).toBeTruthy();
    expect(failedItemIsUpdating).toBeFalsy();
  });
});

describe('Delete item', () => {
  const itemToDelete: IListAction = deleteItem('-1');
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(itemToDelete.payload.id, new ListItem({
      id: itemToDelete.payload.id,
      text: 'Delete me.'
    }));

  it('shouldn\'t delete item from state', () => {
    const expectedResult = initialState
      .setIn([itemToDelete.payload.id, 'isUpdating'], true);

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should set item\'s isUpdating to true', () => {
    const originIsUpdating = initialState.get(itemToDelete.payload.id).isUpdating;

    const result = items(initialState, itemToDelete);
    const deletedItemIsUpdating = result.get(itemToDelete.payload.id).isUpdating;

    expect(originIsUpdating).toBeFalsy();
    expect(deletedItemIsUpdating).toBeTruthy();
  });

  it('should set item\'s error to undefined', () => {
    const stateWithError = initialState
      .setIn([itemToDelete.payload.id, 'error'], '00000000-0000-0000-0000-000000000001');
    const expectedResult = initialState
      .setIn([itemToDelete.payload.id, 'isUpdating'], true);

    const result = items(stateWithError, itemToDelete);

    expect(result).toEqual(expectedResult);
  });
});

describe('Delete item success', () => {
  const itemToDelete: IListAction = deleteItemSuccess('-1');
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(itemToDelete.payload.id, new ListItem({
      id: itemToDelete.payload.id,
      text: 'Delete me.',
    }));

  it('should do nothing with empty state', () => {
    const expectedResult = OrderedMap<Uuid, ListItem>();

    const result = items(undefined, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should delete item from array which contains it', () => {
    const expectedResult = OrderedMap<Uuid, ListItem>();

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should\'t modify state which doesn\'t contain item with given errorId', () => {
    const notInStateItem: IListAction = deleteItemSuccess('1');
    const result = items(initialState, notInStateItem);

    expect(result).toEqual(initialState);
  });
});

describe('Delete item fail', () => {
  const item = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Text',
  });

  const error = new ListError({
      itemId: item.id,
      errorId: '00000000-0000-0000-0000-000000000002',
    });

  const itemToDelete = deleteItemFail(item.id, error);
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);

  it('should set item\'s error', () => {
    const originItemError = initialState.get(item.id).error;

    const result = items(initialState, itemToDelete);
    const failedItemError = result.get(item.id).error;

    expect(originItemError).toBeUndefined();
    expect(failedItemError).toEqual(error.errorId);
  });

  it('shouldn\'t delete item from state', () => {
    const expectedResult = initialState.setIn([item.id, 'error'], error.errorId);

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });
});

describe('Change item editing mode', () => {
  const item = new ListItem({
    id: '1',
    text: 'Click me.',
  });
  const clickedItem: IListAction = changeItemEditingMode(item.id);
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);
  const stateWithClicked = initialState
    .setIn([item.id, 'isEdited'], true);

  it('should change mode from false to true', () => {
    const result = items(initialState, clickedItem);

    expect(result).toEqual(stateWithClicked);
  });

  it('should change mode from true to false', () => {
    const result = items(stateWithClicked, clickedItem);

    expect(result).toEqual(initialState);
  });
});

describe('Save item', () => {
  const item = new ListItem({
    id: '1',
    text: 'Change me.',
  });
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);
  const changedItem: IListAction = saveItem(item.id, 'Text changed.');

  it('should change original text to text given as argument', () => {
    const expectedResult = initialState
      .setIn([item.id, 'text'], changedItem.payload.text)
      .setIn([item.id, 'isUpdating'], true);

    const result = items(initialState, changedItem);

    expect(result).toEqual(expectedResult);
  });

  it('should change editing mode to false', () => {
    const expectedResult = initialState
      .setIn([item.id, 'text'], changedItem.payload.text)
      .setIn([item.id, 'isUpdating'], true);
    const stateWithClickedItem = initialState
      .setIn([item.id, 'isEdited'], true);

    const result = items(stateWithClickedItem, changedItem);

    expect(result).toEqual(expectedResult);
  });

  it('should change item\'s isUpdating to true', () => {
    const originItemIsUpdating = initialState.get(item.id).isUpdating;

    const result = items(initialState, changedItem);
    const savedItemIsUpdating = result.get(item.id).isUpdating;

    expect(originItemIsUpdating).toBeFalsy();
    expect(savedItemIsUpdating).toBeTruthy();
  });
});
