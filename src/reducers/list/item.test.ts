import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';
import { addItem } from '../../actions/postItem';
import { saveItem } from '../../actions/putItem';

describe('Add item', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const listItem: ListItem = new ListItem({id: '00000000-0000-0000-0000-000000000000', text: 'I am new item.'});
    const action: IListAction = addItem(listItem);
    const expectedResult = new ListItem({...action.payload});

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const listItem: ListItem = new ListItem({id: '00000000-0000-0000-0000-000000000000', text: 'I am new item.'});
    const action: IListAction = addItem(listItem);
    const initialState = new ListItem();
    const expectedResult = new ListItem({...action.payload});

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
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

describe('Save item changes', () => {
  it('should return new item with same values as action\'s payload with undefined state', () => {
    const action: IListAction = saveItem('1', 'saved');
    const expectedResult = new ListItem({...action.payload});

    const result = item(undefined, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return new item with same values as action\'s payload with defined state', () => {
    const action: IListAction = saveItem('1', 'saved');
    const initialState = new ListItem();
    const expectedResult = new ListItem({...action.payload});

    const result = item(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});
