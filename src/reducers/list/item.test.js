import {
  addItem,
  saveItemChanges
} from '../../actions/listActionCreators';
import { ListItem } from '../../models/ListItem';
import { item } from './item';

describe('Add item', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action = addItem('I am new item.');
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action = addItem('I am new item.');
    const initialState = new ListItem();
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new empty item when passing invalid action', () => {
    const newItem = { type: 'INVALID' };
    const expectedResult = new ListItem();

    const result = item(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Save item changes', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action = saveItemChanges(1, 'saved');
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action = saveItemChanges(1, 'saved');
    const initialState = new ListItem();
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});
