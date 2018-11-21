import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items';
import { changeItemEditingMode, } from '../../actions/listActionCreators';
import { IListAction } from '../../actions/types/IListAction';
import { ListError } from '../../models/ListError';
import { addItem, addItemFail, addItemSuccess } from '../../actions/thunks/postItemFactory';
import {
  deleteItem,
  deleteItemFail,
  deleteItemSuccess
} from '../../actions/thunks/deleteItemFactory';
import { saveItem, saveItemFail, saveItemSuccess } from '../../actions/thunks/putItemFactory';
import { closeSaveError } from '../../actions/thunks/closeError';
import { receiveItemsSuccess } from '../../actions/thunks/getItemsFactory';

describe('Add item requested', () => {
  const id1 = '00000000-0000-0000-0000-000000000001';
  const id2 = '00000000-0000-0000-0000-000000000002';
  const id3 = '00000000-0000-0000-0000-000000000003';
  const listItem: ListItem = new ListItem({
    id: id1,
    text: 'I am new item.'
  });
  const newItem: IListAction = addItem(listItem.id, listItem.text);
  const newListItem = new ListItem({...newItem.payload});
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(
      id2,
      new ListItem({id: id2, text: 'A'})
    )
    .set(
      id3,
      new ListItem({id: id3, text: 'B'})
    );

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

  it('invalid action shouldn\'t modify state', () => {
    const invalidItem: IListAction = {
      type: 'INVALID',
      payload: {id: '1'},
    };

    const result = items(initialState, invalidItem);

    expect(result).toEqual(initialState);
  });
});

describe('Delete item requested', () => {
  const itemToDelete: IListAction = deleteItem('00000000-0000-0000-0000-000000000001');
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
});

describe('Save item requested', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Change me.',
  });
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);
  const changedItem: IListAction = saveItem(item.id, 'Text changed.');
  const expectedResult = initialState
    .setIn([item.id, 'text'], changedItem.payload.text)
    .setIn([item.id, 'isUpdating'], true);


  it('should change original text to text given as argument', () => {
    const result = items(initialState, changedItem);

    expect(result).toEqual(expectedResult);
  });

  it('should change editing mode to false', () => {
    const stateWithClickedItem = initialState
      .setIn([item.id, 'isEdited'], true);

    const result = items(stateWithClickedItem, changedItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Add item success', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Add me.',
    isUpdating: true,
  });
  const newId = '00000000-0000-0000-0000-000000000003';
  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const newItem: IListAction = addItemSuccess(item.id, newId);

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

  it('should delete item from state which contains it', () => {
    const expectedResult = OrderedMap<Uuid, ListItem>();

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should\'t modify state which doesn\'t contain item with given id', () => {
    const notInStateItem: IListAction = deleteItemSuccess('1');
    const result = items(initialState, notInStateItem);

    expect(result).toEqual(initialState);
  });
});

describe('Change item editing mode', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Click me.',
  });
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);
  const clickedItem: IListAction = changeItemEditingMode(item.id);

  it('shouldn\'t add or delete item from state', () => {
    const expectedResult = initialState
      .updateIn([item.id, 'isEdited'], isEdited => !isEdited);

    const result = items(initialState, clickedItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Close save item', () => {
  const backupText = 'Backup text.';
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Save me.',
  });
  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const savedItem: IListAction = closeSaveError(item.id, backupText);

  it('shouldn\'t add or delete item from state', () => {
    const expectedResult = initialState
      .set(item.id, new ListItem({id: item.id, text: backupText}));

    const result = items(initialState, savedItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Failed save, delete, add', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'something',
    isUpdating: true,
  });

  const error: ListError = new ListError({
    itemId: item.id,
    errorId: '00000000-0000-0000-0000-000000000002',
  });

  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const failActions = [
    addItemFail(item.id, error),
    saveItemFail(item.id, error),
    deleteItemFail(item.id, error)
  ];

  failActions.forEach(action => {
    it('shouldn\'t add or delete item from state', () => {
      const expectedResult = initialState
        .setIn([item.id, 'isUpdating'], false);

      const result = items(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

describe('Save item success', () => {
  const item: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'nothing',
    isUpdating: true
  });
  const initialState = OrderedMap<Uuid, ListItem>().set(item.id, item);
  const savedItem: IListAction = saveItemSuccess(item.id);

  it('shouldn\'t add or delete item from state', () => {
    const expectedResult = initialState.setIn([item.id, 'isUpdating'], false);

    const result = items(initialState, savedItem);

    expect(result).toEqual(expectedResult);
  });
});


describe('Receive items', () => {
  it('should return given state', () => {
    const item1: ListItem = new ListItem({
      id: '00000000-0000-0000-0000-000000000001',
      text: 'nothing',
    });
    const item2: ListItem = new ListItem({
      id: '00000000-0000-0000-0000-000000000002',
      text: 'anything',
    });
    const initialState = OrderedMap<Uuid, ListItem>().set(item1.id, item1).set(item2.id, item2);
    const receivedItems = receiveItemsSuccess(initialState);

    const result = items(initialState, receivedItems);

    expect(result).toEqual(initialState);
  });
});
