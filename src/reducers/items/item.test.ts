import {
  addItem, changeItemEditingMode,
  saveItemChanges,
} from '../../actions/listActionCreators';
import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';

describe('Add item', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action: IListAction = addItem('I am new item.');
    const expectedResult = new ListItem({ ...action.payload });

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action: IListAction = addItem('I am new item.');
    const initialState = new ListItem();
    const expectedResult = new ListItem({ ...action.payload });

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

describe('Change item editing mode', () => {
  const itemWithFalseMode: ListItem = new ListItem({
    id: '00000000-0000-0000-0000-000000000001',
    text: 'Click me.',
  });
  const clickedItem: IListAction = changeItemEditingMode(itemWithFalseMode.id);
  const itemWithTrueMode: ListItem = new ListItem({
    id: itemWithFalseMode.id,
    text: itemWithFalseMode.text,
    isEdited: true,
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
