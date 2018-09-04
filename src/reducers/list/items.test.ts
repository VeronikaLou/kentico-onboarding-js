import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items';
import {
  addItem,
  changeItemEditingMode,
  deleteItem,
  saveItemChanges
} from '../../actions/listActionCreators';

describe('Add item', () => {
  const newItem = addItem('New item.');
  const newListItem = ListItem({ ...newItem.payload });
  const initialState = new OrderedMap(ListItem({
    id: 0,
    text: 'A'
  }), ListItem({
    id: 1,
    text: 'B'
  }));

  it('should add item into empty state', () => {
    const expectedResult = new OrderedMap()
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
    const invalidItem = { type: 'INVALID' };

    const result = items(initialState, invalidItem);

    expect(result).toEqual(initialState);
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
    const notInStateItem = deleteItem(1);
    const result = items(initialState, notInStateItem);

    expect(result).toEqual(initialState);
  });
});

describe('Change item editing mode', () => {
  const item = new ListItem({
    id: 1,
    text: 'Click me.'
  });
  const clickedItem = changeItemEditingMode(item.id);
  const initialState = new OrderedMap()
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

describe('Save item changes', () => {
  const item = new ListItem({
    id: 1,
    text: 'Change me.'
  });
  const initialState = new OrderedMap()
    .set(item.id, item);
  const changedItem = saveItemChanges(item.id, 'Text changed.');

  it('should change original text to text given as argument', () => {
    const expectedResult = initialState.setIn([item.id, 'text'], changedItem.payload.text);

    const result = items(initialState, changedItem);

    expect(result).toEqual(expectedResult);
  });

  it('should change editing mode to false', () => {
    const expectedResult = initialState
      .setIn([item.id, 'text'], changedItem.payload.text);
    const stateWithClickedItem = initialState
      .setIn([item.id, 'isEdited'], true);

    const result = items(stateWithClickedItem, changedItem);

    expect(result).toEqual(expectedResult);
  });
});
