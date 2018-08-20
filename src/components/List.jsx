import React, { PureComponent } from 'react';
import { Record } from 'immutable';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { generateId } from '../utils/generateId';
import {
  createItem,
  createItems
} from '../utils/itemsCreator';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: createItems()
  };

  _addItem = (text) => {
    const newItem = Record({ text, isEdited: false });
    const items = this.state.items.set(generateId(), newItem);
    this.setState(() => ({ items }));
  };

  _saveChanges = (id, text) => {
    const editedItem = Record({ text, isEdited: false });
    const items = this.state.items.update(id, () => editedItem);
    this.setState(() => ({ items }));
  };

  _deleteItem = (id) =>{
    const items = this.state.items.delete(id);
    this.setState(() => ({ items }));
  };

  _changeEditingMode = (id) => {
    const item = this.state.items.get(id).update('isEdited', (isEdited) => !isEdited);
    const items = this.state.items.update(id, () => item);
    this.setState(() => ({ items }));
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index + 1}
                deleteItem={this._deleteItem}
                saveChanges={this._saveChanges}
                changeEditingMode={this._changeEditingMode}
              />
            ))}
            <NewItem addItem={this._addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
