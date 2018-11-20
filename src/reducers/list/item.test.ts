import {
  addItem,
  // addItem,
  saveItemChanges,
} from '../../actions/listActionCreators';
import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';

describe('Add item', () => {
  const id = '00000000-0000-0000-0000-000000000000';

  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action: IListAction = addItem(id, 'I am new item.');
    const expectedResult = new ListItem({ id, ...action.payload });

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action: IListAction = addItem(id, 'I am new item.');
    const initialState = new ListItem();
    const expectedResult = new ListItem({ id, ...action.payload });

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new empty item when passing invalid action', () => {
    const newItem: IListAction = {
      type: 'INVALID',
      payload: {
        id: '1',
      }};
    const expectedResult = new ListItem();

    const result = item(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Save item changes', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action: IListAction = saveItemChanges('1', 'saved');
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action: IListAction = saveItemChanges('1', 'saved');
    const initialState = new ListItem();
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});
