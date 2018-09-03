import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items';
import {
  addItem,
  changeEditingMode,
  deleteItem,
  saveChanges
} from '../../actions/listActionCreators';

describe('Add item', () => {
  const newItem = addItem('New item.');
  const newListItem = ListItem({ ...newItem.payload });

  it('should add item into empty state', () => {
    const expectedResult = new OrderedMap()
      .set(newListItem.id, newListItem);

    const result = items(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });

  it('should add third item', () => {
    const initialState = new OrderedMap(ListItem({
      id: 0,
      text: 'A'
    }), ListItem({
      id: 1,
      text: 'B'
    }));
    const expectedResult = initialState
      .set(newListItem.id, newListItem);

    const result = items(initialState, newItem);

    expect(result).toEqual(expectedResult);
  });

  it('should do nothing with invalid type', () => {
    const invalidItem = {
      type: 'INVALID',
      id: -1,
      text: 'NEW_ITEM'
    };

    const result = items(undefined, invalidItem);

    expect(result).toEqual(new OrderedMap());
  });
});

describe('Delete item', () => {
  const itemToDelete = deleteItem(-1);
  const initialState = new OrderedMap()
    .set(itemToDelete.payload.id, new ListItem({
      id: itemToDelete.payload.id,
      text: 'Delete me.'
    }));

  it('should do nothing with empty state', () => {
    const expectedResult = new OrderedMap();

    const result = items(undefined, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should delete item from array which contains it', () => {
    const expectedResult = new OrderedMap();

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should\'t modify state which doesn\'t contain item with given id', () => {
    const result = items(initialState, deleteItem(1));

    expect(result).toEqual(initialState);
  });
});

describe('Change editing mode', () => {
  const item = addItem('Click me.');
  const clickedItem = changeEditingMode(item.payload.id);
  const initialState = new OrderedMap().set(item.payload.id, new ListItem({ ...item.payload }));
  const stateWithClicked = new OrderedMap().set(item.payload.id, new ListItem({
    ...item.payload,
    isEdited: true
  }));

  it('checks if default mode is false', () => {
    expect(item.isEdited).toBeFalsy();
  });

  it('should change mode from false to true', () => {
    expect(items(initialState, clickedItem)).toEqual(stateWithClicked);
  });

  it('should change mode from true to false', () => {
    expect(items(stateWithClicked, clickedItem)).toEqual(initialState);
  });
});

describe('Save changes', () => {
  const item = new ListItem({
    id: 1,
    text: 'Change me.'
  });
  const initialState = new OrderedMap().set(item.id, item);
  const changedItem = saveChanges(item.id, 'Text changed.');

  it('should change original text to text given as argument', () => {
    const expectedResult = initialState.setIn([item.id, 'text'], changedItem.payload.text);

    const result = items(initialState, changedItem);

    expect(result).toEqual(expectedResult);
  });

  it('should change editing mode to false', () => {
    const expectedResult = initialState.setIn([item.id, 'text'], changedItem.payload.text);
    const stateWithClickedItem = initialState.setIn([item.id, 'isEdited'], true);

    const result = items(stateWithClickedItem, changedItem);

    expect(result).toEqual(expectedResult);
  });
});
