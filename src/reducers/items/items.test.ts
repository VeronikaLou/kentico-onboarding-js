import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items';
import {
  addItem,
  changeItemEditingMode,
  deleteItem, itemsFetchSuccess,
  saveItemChanges,
} from '../../actions/listActionCreators';
import { IListAction } from '../../actions/types/IListAction';

const id1 = '00000000-0000-0000-0000-000000000001';
const id2 = '00000000-0000-0000-0000-000000000002';

describe('Add item', () => {
  const newItem: IListAction = addItem('New item.');
  const newListItem = new ListItem({ ...newItem.payload });
  const initialState = OrderedMap<Uuid, ListItem>()
    .set('0', new ListItem({id: '0', text: 'A'}))
    .set('1', new ListItem({id: '1', text: 'B'}));

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

describe('Delete item', () => {
  const itemToDelete: IListAction = deleteItem('-1');
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

  it('should delete item from array which contains it', () => {
    const expectedResult = OrderedMap<Uuid, ListItem>();

    const result = items(initialState, itemToDelete);

    expect(result).toEqual(expectedResult);
  });

  it('should\'t modify state which doesn\'t contain item with given id', () => {
    const notInStateItem: IListAction = deleteItem('1');
    const result = items(initialState, notInStateItem);

    expect(result).toEqual(initialState);
  });
});

describe('Change item editing mode', () => {
  const item: ListItem = new ListItem({
    id: id1,
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

describe('Save item changes', () => {
  const item = new ListItem({
    id: '1',
    text: 'Change me.',
  });
  const initialState = OrderedMap<Uuid, ListItem>()
    .set(item.id, item);
  const changedItem: IListAction = saveItemChanges(item.id, 'Text changed.');

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

describe('Items fetch success', () => {
  it('should return given state', () => {
    const item1: ListItem = new ListItem({
      id: id1,
      text: 'nothing',
    });
    const item2: ListItem = new ListItem({
      id: id2,
      text: 'anything',
    });
    const initialState = OrderedMap<Uuid, ListItem>().set(item1.id, item1).set(item2.id, item2);
    const receivedItems = itemsFetchSuccess(initialState);

    const result = items(initialState, receivedItems);

    expect(result).toEqual(initialState);
  });
});
