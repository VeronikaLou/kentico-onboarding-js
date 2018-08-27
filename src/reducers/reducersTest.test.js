import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import {
  performAction
} from './reducers';
import {
  addItem,
  deleteItem
} from '../actions/actionCreators';

describe('Add item', () => {
  const newItem = addItem('New item');
  const newListItem = ListItem({ id: newItem.id, text: newItem.text });

  it('should add item into empty array', () => {
    const expectedResult = new OrderedMap()
      .set(newListItem.id, newListItem);

    expect(performAction(undefined, newItem)).toEqual(expectedResult);
  });

  it('should add third item', () => {
    const initialState = new OrderedMap(ListItem({ id: 0, text: 'A' }), ListItem({ id: 1, text: 'B' }));

    const expectedResult = initialState
      .set(newListItem.id, newListItem);

    expect(performAction(initialState, newItem)).toEqual(expectedResult);
  });

  it('should do nothing with invalid type', () => {
    const invalidItem = { type: 'INVALID', id: -1, text: 'NEW_ITEM' };

    expect(performAction(undefined, invalidItem)).toEqual(new OrderedMap());
  });
});

describe('Delete item', () => {
  const itemToDelete = deleteItem(-1);
  const initialState = new OrderedMap()
    .set(itemToDelete.id, new ListItem({ id: itemToDelete.id, text: 'Delete me.' }));

  it('should do nothing with empty array', () => {
    expect(performAction(undefined, itemToDelete)).toEqual(new OrderedMap());
  });

  it('should delete item from state', () => {
    expect(performAction(initialState, itemToDelete)).toEqual(new OrderedMap());
  });

  it('should\'t modify state without given item', () => {
    expect(performAction(initialState, deleteItem(1))).toEqual(initialState);
  });
});
