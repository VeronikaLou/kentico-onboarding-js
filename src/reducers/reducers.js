import { OrderedMap } from 'immutable';
import {
  ITEM_ADD,
  ITEM_DELETE
} from '../actions/actionTypes';
import { ListItem } from '../models/ListItem';

export const performAction = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return _addItem(state, action);
    case ITEM_DELETE:
      return _deleteItem(state, action);
    default:
      return state;
  }
};

const _addItem = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_ADD:
      return state.set(action.id, new ListItem({
        id: action.id,
        text: action.text
      }));
    default:
      return state;
  }
};

const _deleteItem = (state = new OrderedMap(), action) => {
  switch (action.type) {
    case ITEM_DELETE:
      return state.delete(action.id);
    default:
      return state;
  }
};
