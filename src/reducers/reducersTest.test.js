import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { performAction } from './reducers';
import {
  addItem,
  changeEditingMode,
  deleteItem,
  saveChanges
} from '../actions/actionCreators';

describe('Add item', () => {
  const newItem = addItem('New item.');
  const newListItem = ListItem({
    id: newItem.id,
    text: newItem.text
  });

  it('should add item into empty state', () => {
    const expectedResult = new OrderedMap()
      .set(newListItem.id, newListItem);

    expect(performAction(undefined, newItem)).toEqual(expectedResult);
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

    expect(performAction(initialState, newItem)).toEqual(expectedResult);
  });

  it('should do nothing with invalid type', () => {
    const invalidItem = {
      type: 'INVALID',
      id: -1,
      text: 'NEW_ITEM'
    };

    expect(performAction(undefined, invalidItem)).toEqual(new OrderedMap());
  });
});

describe('Delete item', () => {
  const itemToDelete = deleteItem(-1);
  const initialState = new OrderedMap()
    .set(itemToDelete.id, new ListItem({
      id: itemToDelete.id,
      text: 'Delete me.'
    }));

  it('should do nothing with empty array', () => {
    expect(performAction(undefined, itemToDelete)).toEqual(new OrderedMap());
  });

  it('should delete item from state', () => {
    expect(performAction(initialState, itemToDelete)).toEqual(new OrderedMap());
  });

  it('should\'t modify state which doesn\'t contain item with given id', () => {
    expect(performAction(initialState, deleteItem(1))).toEqual(initialState);
  });
});

describe('Change editing mode', () => {
  const item = addItem('Click me.');
  const clickedItem = changeEditingMode(item.id);
  const initialState = new OrderedMap().set(item.id, new ListItem({ ...item }));
  const stateWithClicked = new OrderedMap().set(item.id, new ListItem({
    ...item,
    isEdited: true
  }));

  it('checks if default mode is false', () => {
    expect(item.isEdited).toBeFalsy();
  });

  it('should change mode from false to true', () => {
    expect(performAction(initialState, clickedItem)).toEqual(stateWithClicked);
  });

  it('should change mode from true to false', () => {
    expect(performAction(stateWithClicked, clickedItem)).toEqual(initialState);
  });
});

describe('Save changes', () => {
  const item = addItem('Change me.');
  const initialState = new OrderedMap().set(item.id, new ListItem({ ...item }));
  const changeText = saveChanges(item.id, 'Text changed.');

  it('should change original text to text given as argument', () => {
    const expectedResult = initialState.setIn([item.id, 'text'], changeText.text);

    expect(performAction(initialState, changeText)).toEqual(expectedResult);
  });

  it('should change editing mode to false', () => {
    const changedItem = saveChanges(item.id, item.text);
    const saveChangedItem = performAction(initialState, changedItem);
    const expectedResult = performAction(saveChangedItem, changeEditingMode(item.id));

    expect(performAction(expectedResult, changedItem)).toEqual(initialState);
  });
});
