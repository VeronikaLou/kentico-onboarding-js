import {
  addItem,
  addItemSuccess,
  changeItemEditingMode,
  saveItemChanges,
} from '../../actions/listActionCreators';
import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';


const id = '00000000-0000-0000-0000-000000000001';

describe('Add item request', () => {
  const listItem: ListItem = new ListItem({
    id,
    text: 'I am list item.',
  });

  it('should change item\'s isUpdating to true', () => {
    const originItemIsUpdating = listItem.isUpdating;
    const newItem = addItem(listItem.id, listItem.text);

    const result = item(listItem, newItem);
    const changedItemIsUpdating = result.isUpdating;

    expect(originItemIsUpdating).toBeFalsy();
    expect(changedItemIsUpdating).toBeTruthy();
  });
});

describe('Add item', () => {
  const states = [undefined, new ListItem()];

  states.forEach(initialState => {
    it('should return new item with same values as action\'s payload', () => {
      const listItem: ListItem = new ListItem({id, text: 'I am new item.'});
      const action: IListAction = addItem(listItem.id, listItem.text);
      const expectedResult = new ListItem({...action.payload});

      const result = item(initialState, action);

      expect(result).toEqual(expectedResult);
    });
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
    const listItem: ListItem = new ListItem({id, isUpdating: true});
    const fetchedId = '00000000-0000-0000-0000-000000000002';
    const newItem: IListAction = addItemSuccess(listItem.id, fetchedId);

    it('old item\'s isUpdating should be true, new item\'s should be false', () => {
      const originIsUpdating = listItem.isUpdating;

      const result = item(listItem, newItem);
      const newItemIsUpdating = result.isUpdating;

      expect(newItemIsUpdating).toBeFalsy();
      expect(originIsUpdating).toBeTruthy();
    });

    it(`new item\'s id should be ${fetchedId}`, () => {
      const result = item(listItem, newItem);
      const newItemId = result.id;

      expect(newItemId).toEqual(fetchedId);

    });
  },
);

describe('Save item changes', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action: IListAction = saveItemChanges('1', 'saved');
    const expectedResult = new ListItem({...action.payload});

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action: IListAction = saveItemChanges('1', 'saved');
    const initialState = new ListItem();
    const expectedResult = new ListItem({...action.payload});

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});

describe('Change item editing mode', () => {
  const itemWithFalseMode: ListItem = new ListItem({
    id,
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
